/* eslint-disable prettier/prettier */
const resolvePage = (module: string, page: string) =>
  `modules/${module}/pages/${page}/index`;

export default {
  pages: [
    resolvePage("index", "home"),
    resolvePage("index", "activity-detail"),
    resolvePage("campus", "index"),
    resolvePage("campus", "safe-run"),
    resolvePage("campus", "safe-run-history"),
    resolvePage("campus", "shark-it"),
    resolvePage("volunteer", "bind"),
    resolvePage("volunteer", "index"),
    resolvePage("volunteer", "detail"),
    resolvePage("ticket", "rob-ticket"),
    resolvePage("id", "index"),
    resolvePage("id", "apply"),
    resolvePage("my", "index"),
    resolvePage("my", "my-activity"),
    resolvePage("my", "my-reward"),
    resolvePage("ticket", "my-ticket"),
    resolvePage("feedback", "index"),
    resolvePage("feedback", "result"),
    resolvePage("index", "bind"),
    "modules/webview/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#F6F6F9",
    navigationBarTitleText: "重邮帮",
    navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
  tabBar: {
    color: "#A4A3B7",
    selectedColor: "#625AF8",
    backgroundColor: "#FFFFFF",
    borderStyle: "white",
    list: [
      {
        pagePath: resolvePage("index", "home"),
        text: "首页",
        iconPath: "static/images/home-icon.png",
        selectedIconPath: "static/images/home-active-icon.png",
      },
      {
        pagePath: resolvePage("my", "index"),
        text: "我的",
        iconPath: "static/images/my-icon.png",
        selectedIconPath: "static/images/my-active-icon.png",
      },
    ],
  },
};
