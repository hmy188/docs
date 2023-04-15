import{_ as t,W as l,X as p,Z as s,$ as a,Y as r,a0 as n,D as i}from"./framework-b1673076.js";const o={},c=n(`<h1 id="shell脚本加定时任务删除es的索引" tabindex="-1"><a class="header-anchor" href="#shell脚本加定时任务删除es的索引" aria-hidden="true">#</a> Shell脚本加定时任务删除Es的索引</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@elasticsearch-node1 ~<span class="token punctuation">]</span><span class="token comment"># crontab -l</span>
<span class="token number">0</span> <span class="token number">1</span> * * * /bin/sh /opt/script/delete_180days.sh
<span class="token number">0</span> <span class="token number">2</span> * * * /bin/sh /opt/script/delete_365days.sh
<span class="token number">0</span> <span class="token number">3</span> * * * /bin/sh /opt/script/delete_60days.sh
<span class="token number">0</span> <span class="token number">4</span> * * * /bin/sh /opt/script/delete_7days.sh
<span class="token punctuation">[</span>root@elasticsearch-node1 ~<span class="token punctuation">]</span><span class="token comment"># cat /opt/script/*</span>
<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">old_date</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;180 day ago&quot;</span> +<span class="token string">&quot;%Y-%m-%d&quot;</span><span class="token variable">\`</span></span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/ivanti_core-<span class="token variable">\${old_date}</span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/ivanti_preferred-<span class="token variable">\${old_date}</span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/winlogbeat-<span class="token variable">\${old_date}</span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/winlogbeat_printer-<span class="token variable">\${old_date}</span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/network_35_aruba_system-<span class="token variable">\${old_date}</span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/network_23_huawei-<span class="token variable">\${old_date}</span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/network_35_zdns-<span class="token variable">\${old_date}</span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/koala_api-<span class="token variable">\${old_date}</span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/koala-<span class="token variable">\${old_date}</span>
<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">old_date</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;120 day ago&quot;</span> +<span class="token string">&quot;%Y-%m-%d&quot;</span><span class="token variable">\`</span></span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/jumpserver23-<span class="token variable">\${old_date}</span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/jumpserver23_it-<span class="token variable">\${old_date}</span>
<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">old_date</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;60 day ago&quot;</span> +<span class="token string">&quot;%Y-%m-%d&quot;</span><span class="token variable">\`</span></span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/prometheus-<span class="token variable">\${old_date}</span>
<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">old_date</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;7 day ago&quot;</span> +<span class="token string">&quot;%Y-%m-%d&quot;</span><span class="token variable">\`</span></span>
<span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span>  <span class="token parameter variable">--user</span> elastic:**********  http://10.26.*.*:9200/dns_*-<span class="token variable">\${old_date}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),d={href:"https://www.runoob.com/linux/linux-comm-date.html",target:"_blank",rel:"noopener noreferrer"},u=n(`<p>输出昨天日期：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># date -d &quot;1 day ago&quot; +&quot;%Y-%m-%d&quot;
2012-11-19
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>输出 2 秒后的时间：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># date -d &quot;2 second&quot; +&quot;%Y-%m-%d %H:%M.%S&quot;
2012-11-20 14:21.31
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>传说中的 1234567890 秒：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># date -d &quot;1970-01-01 1234567890 seconds&quot; +&quot;%Y-%m-%d %H:%M:%S&quot;
2009-02-13 23:02:30
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function v(b,m){const e=i("ExternalLinkIcon");return l(),p("div",null,[c,s("p",null,[a("主要涉及到"),s("a",d,[a("date"),r(e)]),a("命令的用法")]),u])}const _=t(o,[["render",v],["__file","脚本输出前六十天的日期.html.vue"]]);export{_ as default};
