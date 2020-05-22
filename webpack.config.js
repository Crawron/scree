const merge = require("webpack-merge")

/** @type {import('webpack').Configuration} */
const baseConfig = {
  output: {
    path: `${__dirname}/build`,
  },
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader" }],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  stats: {
    entrypoints: false,
    modules: false,
  },
  node: false,
}

module.exports = [
  merge(baseConfig, {
    entry: "./src/main.entry",
    output: { filename: "main.js" },
    target: "electron-main",
  }),
  merge(baseConfig, {
    entry: "./src/editor.entry",
    output: { filename: "editor.js" },
    target: "electron-renderer",
  }),
]