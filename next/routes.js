const routes = require("next-routes");

module.exports = routes()
  .add("about")
  .add("index")
  .add("articles")
  .add("profile")
  .add("settings")
  .add("ssr-profile")
  .add("callback", "/api/callback", "/api/callback")
  .add("login", "/api/login", "/api/login")
  .add("logout", "/api/logout", "/api/logout")
  .add("me", "/api/me", "/api/me");
