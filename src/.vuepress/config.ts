import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/docs/",
  lang: "zh-CN",
  theme,

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
    })
    ]
  // locales: {
  //   "/": {
  //     lang: "en-US",
  //     title: "Docs Demo",
  //     description: "A docs demo for vuepress-theme-hope",
  //   },
  //   "/zh/": {
  //     lang: "zh-CN",
  //     title: "Yinyu985的biji",
  //     description: "Yinyu985的biji",
  //   },
  // },
});
