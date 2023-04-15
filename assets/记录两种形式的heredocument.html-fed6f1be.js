import{_ as s,W as n,X as e,a0 as a}from"./framework-b1673076.js";const i={},t=a(`<h1 id="记录两种形式的heredocument" tabindex="-1"><a class="header-anchor" href="#记录两种形式的heredocument" aria-hidden="true">#</a> 记录两种形式的heredocument</h1><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@ip-172-31-13-117:~<span class="token comment"># cat &gt;&gt; /etc/rancher/k3s/registries.yaml &lt;&lt;EOF</span>

mirrors:
  <span class="token string">&quot;harbor.kingsd.top&quot;</span><span class="token builtin class-name">:</span>
    endpoint:
      - <span class="token string">&quot;https://harbor.kingsd.top&quot;</span>
configs:
  <span class="token string">&quot;harbor.kingsd.top&quot;</span><span class="token builtin class-name">:</span>
    auth:
      username: admin <span class="token comment"># this is the registry username</span>
      password: Harbor12345 <span class="token comment"># this is the registry password</span>
EOF
systemctl restart k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>root@ip-172-31-13-117:~<span class="token comment"># cat &lt;&lt;EOF&gt;&gt; /etc/rancher/k3s/registries.yaml </span>
mirrors:
  <span class="token string">&quot;harbor.kingsd.top&quot;</span><span class="token builtin class-name">:</span>
    endpoint:
      - <span class="token string">&quot;https://harbor.kingsd.top&quot;</span>
configs:
  <span class="token string">&quot;harbor.kingsd.top&quot;</span><span class="token builtin class-name">:</span>
    auth:
      username: admin <span class="token comment"># this is the registry username</span>
      password: Harbor12345 <span class="token comment"># this is the registry password</span>
EOF
systemctl restart k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>功能效果都是一样的</p>`,4),r=[t];function l(d,c){return n(),e("div",null,r)}const m=s(i,[["render",l],["__file","记录两种形式的heredocument.html.vue"]]);export{m as default};
