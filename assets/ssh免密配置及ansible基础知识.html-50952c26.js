const e=JSON.parse('{"key":"v-37f92366","path":"/zh/Linux/ssh%E5%85%8D%E5%AF%86%E9%85%8D%E7%BD%AE%E5%8F%8Aansible%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html","title":"ssh免密配置及ansible基础知识","lang":"zh-CN","frontmatter":{"description":"Secure Shell（安全外壳协议，简称SSH）是一种加密的网络传输协议 (https://zh.wikipedia.org/wiki/网络传输协议)，在不安全的网络中为网络服务提供安全的传输 如何配置免密登录 免密登录，只需三步。 首先在SSH服务端配置允许公钥私钥配对认证，; 然后在客户端生成公钥，; 最后将客户端的公钥上传到服务端。; 这样就...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/docs/zh/Linux/ssh%E5%85%8D%E5%AF%86%E9%85%8D%E7%BD%AE%E5%8F%8Aansible%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html"}],["meta",{"property":"og:title","content":"ssh免密配置及ansible基础知识"}],["meta",{"property":"og:description","content":"Secure Shell（安全外壳协议，简称SSH）是一种加密的网络传输协议 (https://zh.wikipedia.org/wiki/网络传输协议)，在不安全的网络中为网络服务提供安全的传输 如何配置免密登录 免密登录，只需三步。 首先在SSH服务端配置允许公钥私钥配对认证，; 然后在客户端生成公钥，; 最后将客户端的公钥上传到服务端。; 这样就..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-15T04:18:32.000Z"}],["meta",{"property":"article:author","content":"ShareYu"}],["meta",{"property":"article:modified_time","content":"2023-04-15T04:18:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"ssh免密配置及ansible基础知识\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-04-15T04:18:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ShareYu\\",\\"url\\":\\"https://yinyu985.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"如何配置免密登录","slug":"如何配置免密登录","link":"#如何配置免密登录","children":[]},{"level":2,"title":"在服务端上（提供ssh服务，就是你登录的那台机器）进行如下操作","slug":"在服务端上-提供ssh服务-就是你登录的那台机器-进行如下操作","link":"#在服务端上-提供ssh服务-就是你登录的那台机器-进行如下操作","children":[]},{"level":2,"title":"在客户端上执行","slug":"在客户端上执行","link":"#在客户端上执行","children":[]},{"level":2,"title":"把id_rsa.pub发送到服务端机器上","slug":"把id-rsa-pub发送到服务端机器上","link":"#把id-rsa-pub发送到服务端机器上","children":[]},{"level":2,"title":"验证","slug":"验证","link":"#验证","children":[]},{"level":2,"title":"1.什么是Ansible","slug":"_1-什么是ansible","link":"#_1-什么是ansible","children":[]},{"level":2,"title":"2.Ansible优势","slug":"_2-ansible优势","link":"#_2-ansible优势","children":[{"level":3,"title":"script脚本模块","slug":"script脚本模块","link":"#script脚本模块","children":[]},{"level":3,"title":"yum安装软件模块","slug":"yum安装软件模块","link":"#yum安装软件模块","children":[]},{"level":3,"title":"copy文件拷贝模块","slug":"copy文件拷贝模块","link":"#copy文件拷贝模块","children":[]},{"level":3,"title":"service服务模块","slug":"service服务模块","link":"#service服务模块","children":[]},{"level":3,"title":"raw 模块","slug":"raw-模块","link":"#raw-模块","children":[]},{"level":3,"title":"command 模块","slug":"command-模块","link":"#command-模块","children":[]},{"level":3,"title":"shell 模块","slug":"shell-模块","link":"#shell-模块","children":[]},{"level":3,"title":"script 模块","slug":"script-模块","link":"#script-模块","children":[]}]}],"git":{"createdTime":1681532312000,"updatedTime":1681532312000,"contributors":[{"name":"yinyu985","email":"yinyu985@gmail.com","commits":1}]},"readingTime":{"minutes":4.67,"words":1400},"filePathRelative":"zh/Linux/ssh免密配置及ansible基础知识.md","localizedDate":"2023年4月15日","autoDesc":true,"excerpt":""}');export{e as data};
