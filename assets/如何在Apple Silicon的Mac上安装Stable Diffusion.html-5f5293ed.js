import{_ as n,W as i,X as l,Z as e,$ as t,Y as a,a0 as o,D as d}from"./framework-b1673076.js";const c={},r=o(`<h1 id="如何在apple-silicon的mac上安装stable-diffusion" tabindex="-1"><a class="header-anchor" href="#如何在apple-silicon的mac上安装stable-diffusion" aria-hidden="true">#</a> 如何在Apple Silicon的Mac上安装Stable Diffusion</h1><p>有四个可选项，我只讲最后的AUTOMATIC1111的Stable Diffusion有web-ui的版本，分析一下各自特点</p><table><thead><tr><th>选项</th><th>特点</th></tr></thead><tbody><tr><td>Diffusers</td><td>最容易安装，但功能不多。</td></tr><tr><td>Draw Things</td><td>最容易安装，具有一组很好的功能。</td></tr><tr><td>DiffusionBee</td><td>易于安装，但功能较少。</td></tr><tr><td>AUTOMATIC1111/<em>stable</em>-<em>diffusion</em>-webui</td><td>最好的功能，但安装起来有点困难。</td></tr></tbody></table><p>第一步打开终端，如果你没有安装homebrew，去homebrew的官网就能找到一键安装的脚本了</p><p>然后开始使用homebrew安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>brew <span class="token function">install</span> cmake protobuf rust python@3.10 <span class="token function">git</span> <span class="token function">wget</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将github仓库克隆到当前mac用户的家目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~ <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会在家目录下创建一个新的文件夹<code>stable-diffusion-webui</code></p>`,9),u={href:"https://stable-diffusion-art.com/models/#Stable_diffusion_v15",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,[t("将下载到的模型移动到"),e("code",null,"~/stable-diffusion-webui/models/Stable-diffusion")],-1),f=e("p",null,"然后通过脚本就能运行了",-1),b=e("div",{class:"language-text line-numbers-mode","data-ext":"text"},[e("pre",{class:"language-text"},[e("code",null,`cd ~/stable-diffusion-webui;./webui.sh
`)]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),h=e("p",null,[t("然后打开浏览器访问"),e("code",null,"http://127.0.0.1:7860/"),t("就可以开始愉快的作图了。")],-1),m={href:"https://stable-diffusion-art.com/install-mac/",target:"_blank",rel:"noopener noreferrer"};function _(g,v){const s=d("ExternalLinkIcon");return i(),l("div",null,[r,e("p",null,[t("然后你需要下载基础的model才能够运行 Stable Diffusion，你可以在"),e("a",u,[t("这里"),a(s)]),t("下载到模型。")]),p,f,b,h,e("p",null,[t("参考引用："),e("a",m,[t("https://stable-diffusion-art.com/install-mac/"),a(s)])])])}const w=n(c,[["render",_],["__file","如何在Apple Silicon的Mac上安装Stable Diffusion.html.vue"]]);export{w as default};
