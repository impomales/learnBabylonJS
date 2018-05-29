const path = require("path");

module.exports = {
  entry: "./babylon/index.js",
  output: {
    path: path.join(__dirname, "assets"),
    filename: "bundle.js"
  },
  mode: "development"
};
