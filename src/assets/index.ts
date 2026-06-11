const placeholder = require("./logo.png");

export const appAssets = {
  logo: require("./logo.png"),
  splash: require("./splash.png"),
  appIcon: require("./icon.png"),
  adaptiveIcon: require("./adaptive-icon.png"),
  icons: {
    home: require("./icons/icon-home.png"),
    products: require("./icons/icon-products.png"),
    chat: require("./icons/icon-chat.png"),
    notifications: require("./icons/icon-notifications.png"),
    profile: require("./icons/icon-profile.png"),
    trace: require("./icons/icon-trace.png"),
    news: require("./icons/icon-news.png"),
    back: require("./icons/icon-back.png")
  },
  images: {
    product: placeholder,
    news: placeholder,
    membership: placeholder
  }
} as const;
