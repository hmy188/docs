import{_ as i,W as r,X as p,Z as s,$ as a,Y as t,a0 as n,D as o}from"./framework-b1673076.js";const l={},c=n(`<h1 id="处理kafka故障全流程" tabindex="-1"><a class="header-anchor" href="#处理kafka故障全流程" aria-hidden="true">#</a> 处理kafka故障全流程</h1><p>今天中午散步回来，美女同事跟我说，最近的日志没有进来，我登上kibana一看，我靠，近两天的日志全没有（部分索引有，部分索引量变少了，部分索引完全没有新日志进来）。怎么办，看日志呗，毕竟咱不能像美女同事一样把这个情况告诉别人然后摆烂吧，本文记录处理的全流程。<!--more--></p><p>kibana看不到日志，说明没进es，登录logstash查看logstash日志显示如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token number">12</span> partitions have leader brokers without a matching listener, including <span class="token punctuation">[</span>koala-0, SDP_system-0, prometheus-0, network_23_clearpass-0, network_35_Aruba-system-0, aduser_change-0, nuc-0, nginx_test-0, Network_23_RS_Device-0, network_35_zdns-0<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不得不说Java程序的日志就是老太太的裹脚布又臭又长，上面只贴了关键部分。</p><p>下面介绍一下我的新同事---chatGPT，不得不说一个拥有全人类知识结晶并且能够理解分析的人工智能很牛逼。至于什么失业，不在本文的讨论范围内，毕竟AI只能提供思路，暂时我还不能失业。</p><figure><img src="https://s2.loli.net/2023/02/27/qGRxI4yaOKpY6NF.png" alt="image-20230227215925115" tabindex="0" loading="lazy"><figcaption>image-20230227215925115</figcaption></figure><p>现在来分析分析我这位同事的分析</p><ul><li>确实是部分分区有leader broker，但是没有listener（并且后面列出来了详细的12个分区）</li><li>检查broker配置，这个东西正常运行，根本没人会动。</li><li>检查网络连接，这三台kafka组成的集群是在Azure上的，出现网络问题的可能性不大吧，将信将疑ping了一下，没啥问题。</li><li>检查分区配置，同上，没人动的。</li></ul>`,9),k={href:"https://github.com/provectus/kafka-ui",target:"_blank",rel:"noopener noreferrer"},d=n('<p>通过查看kafka-ui发现集群中确实有异样</p><figure><img src="https://s2.loli.net/2023/02/27/ozhYHmwel3v2ZyO.png" alt="image-20230227221802513" tabindex="0" loading="lazy"><figcaption>image-20230227221802513</figcaption></figure><p>上图圈出来的就是生产集群的Partitions异常，显示有68个Online,小脑瓜一转，那不就是有12个offline吗？12不就是刚才logstash日志里面报错有12个分区异常吗？至于旁边的URP刚好也是12，问问我同事这啥意思？</p><figure><img src="https://s2.loli.net/2023/02/27/2jvOLwIe7cUWYQt.png" alt="image-20230227222124718" tabindex="0" loading="lazy"><figcaption>image-20230227222124718</figcaption></figure><p>看到没，我同事真牛逼，没三十年运维经验能做到这般对答如流？试问各位看官你们可以吗？</p><p>看我画的红圈，根据logstash日志和kafka-ui，得出大概结论，因为broker发生故障导致同步失败，进入URP状态，产生offline Partition</p><p>那么问题来了怎么解决呢？</p><figure><img src="https://s2.loli.net/2023/02/27/o7NAkqiQGcVYt5s.png" alt="image-20230227222925670" tabindex="0" loading="lazy"><figcaption>image-20230227222925670</figcaption></figure><p>他好像什么都说了又好像什么都没说，</p><ol><li>检查状态，没发现问题，kafka机器稳定运行，负载正常，网络畅通。</li><li>得益于Java日志文件又臭又长，没看到什么故障原因。</li><li>修复，不用修复了，kafka和zookeeper进程都在，部分索引也在“正常”进入es，只是量少了点。</li><li>副本，我们kafka集群从开始运行秉承着能跑就行的原则，设置的副本数就是1，🤦🏻‍♂️.jpg，现在贸然增减不显示，万一对目前正常处理的索引来个洗牌岂不GG？</li><li>分区重新分配，我们最终解决问题的最终成功的原因应该就是这个</li><li>监控broker，确实，经过这次教训，后面Partition和breoker的告警规则也要也写起来了，装了kafka_exporter只为做看板给领导装逼，实际并没有任何告警策略，🤦🏻‍♂️.jpg。</li></ol>',10),m={href:"https://zhuanlan.zhihu.com/p/590443597",target:"_blank",rel:"noopener noreferrer"},u=n(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /data/kafka_2.11-2.2.1/bin <span class="token operator">&amp;&amp;</span> ./kafka-topics.sh <span class="token parameter variable">--describe</span> <span class="token parameter variable">--zookeeper</span> localhost:2181  <span class="token operator">|</span><span class="token function">grep</span> Leader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过上述命令查看各个topic的状态，发现有12的topic的Leader是-1，刚好就是一开始出现问题的那几个，这是不正常的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>	Topic: Network_23_RS_Device	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: SDP_system	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: aduser_change	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: aduser_change1	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: koala	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: ldap	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: network_23_clearpass	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: network_35_Aruba-system	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: network_35_zdns	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: nginx_test	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: nuc	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
	Topic: prometheus	Partition: <span class="token number">0</span>	Leader: <span class="token parameter variable">-1</span>	Replicas: <span class="token number">1</span>	Isr: <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实忙活一大下午，晚上另一个同事也过来看怎么解决，他的看法就是重启大法，我的观点是，现在已经出现了报错，不解决这些offline的partition,万一重启起不来不是直接懵逼，到时候只能不管三七二十一，把整个目录删掉了。</p><p>于是接着查怎样处理这些offline的partition</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /data/kafka_2.11-2.2.1/bin
<span class="token comment">#进入到kafka的安装目录</span>
./zookeeper-shell.sh localhost:2181
<span class="token comment">#使用自带的脚本连接到zookeeper</span>
rmr /brokers/topics/network_35_zdns/partitions/0
rmr /brokers/topics/Network_23_RS_Device/partitions/0
rmr /brokers/topics/SDP_system/partitions/0
rmr /brokers/topics/aduser_change/partitions/0
rmr /brokers/topics/aduser_change1/partitions/0
rmr /brokers/topics/koala/partitions/0
rmr /brokers/topics/ldap/partitions/0
rmr /brokers/topics/network_23_clearpass/partitions/0
rmr /brokers/topics/network_35_Aruba-system/partitions/0
rmr /brokers/topics/nginx_test/partitions/0
rmr /brokers/topics/nuc/partitions/0
rmr /brokers/topics/prometheus/partitions/0
<span class="token comment">#使用以上命令删除异常的topic的异常的partition，有个问题这个shell秉承着linux的设计理念，没有消息就是好消息。</span>
<span class="token comment">#以至于执行删除命令并没有任何返回，于是我重新执行了一遍，然后它报，没有啥啥啥这个啥啥啥，舒适。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删了之后，人家重启了，我们也准备命令重启了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-aux</span> <span class="token operator">|</span> <span class="token function">grep</span>   zooke <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> exporter <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> dhcli <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{print $2}&#39;</span><span class="token operator">|</span><span class="token function">xargs</span> <span class="token function">kill</span> <span class="token parameter variable">-9</span> 
<span class="token builtin class-name">cd</span> /data/kafka_2.11-2.2.1/bin <span class="token operator">&amp;&amp;</span> <span class="token function">nohup</span> ./zookeeper-server-start.sh <span class="token punctuation">..</span>/config/zookeeper.properties <span class="token operator">&amp;</span>
<span class="token builtin class-name">cd</span> /data/kafka_2.11-2.2.1/bin <span class="token operator">&amp;&amp;</span> <span class="token function">nohup</span> ./kafka-server-start.sh <span class="token punctuation">..</span>/config/server.properties <span class="token operator">&gt;</span> kafka.log <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启看日志，没有发现异常，打开kafka-ui的看板，offline的数量全部回来了，URP数量为0。皆大欢喜，再去kibana看，日志开始进来了。</p>`,9);function b(v,g){const e=o("ExternalLinkIcon");return r(),p("div",null,[c,s("p",null,[a("下面介绍一个kafka看板工具，"),s("a",k,[a("kafka-ui"),t(e)]),a("支持展示多集群，支持展示Brokers、Topics、Consumers。")]),d,s("p",null,[a("当然也不能全听我同事的，在Google一番后找到了一篇文章，有部分参考价值， 直接看第三点---"),s("a",m,[a("offline partition异常处理"),t(e)])]),u])}const _=i(l,[["render",b],["__file","处理kafka故障全流程.html.vue"]]);export{_ as default};
