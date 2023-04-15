import{_ as n,W as d,X as t,Z as e,$ as a,Y as i,a0 as l,D as p}from"./framework-b1673076.js";const r={},c=e("h1",{id:"给centos添加swap空间",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#给centos添加swap空间","aria-hidden":"true"},"#"),a(" 给centos添加swap空间")],-1),o={href:"https://so.csdn.net/so/search?q=%E5%86%85%E5%AD%98&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},u=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">free</span> <span class="token parameter variable">-m</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看swap信息，包括文件和分区的详细信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">swapon</span> <span class="token parameter variable">-s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /proc/swaps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果都没有，我们就需要手动添加交换分区。</p><p>1、使用dd命令创建一个swap交换文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span>/dev/zero <span class="token assign-left variable">of</span><span class="token operator">=</span>/data/swap <span class="token assign-left variable">bs</span><span class="token operator">=</span><span class="token number">1024</span> <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">1024000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样就建立一个/home/swap的分区文件，大小为1G。</p><p>2、制作为swap格式文件：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkswap</span> /data/swap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、再用swapon命令把这个文件分区挂载swap分区</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/sbin/swapon /data/swap
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们用free -m命令看一下，发现已经有交换分区了。 但是重启系统后，swap分区又变成0了。</p><p>4、为防止重启后swap分区变成0，要修改/etc/fstab文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>vi /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在文件末尾（最后一行）加上</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/data/swap swap swap default 0 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样就算重启系统，swap分区还是有值。</p>`,19);function v(b,m){const s=p("ExternalLinkIcon");return d(),t("div",null,[c,e("p",null,[a("首先查看当前的"),e("a",o,[a("内存"),i(s)]),a("和swap 空间大小(默认单位为k, -m 单位为M)：")]),u])}const g=n(r,[["render",v],["__file","给centos添加swap空间.html.vue"]]);export{g as default};
