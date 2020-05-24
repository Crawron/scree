// @ts-check
const merge = require("webpack-merge")

/** @type {import('webpack').Configuration} */
const baseConfig = {
  output: {
    path: `${__dirname}/build`,
  },
  module: {
    rules: [{ test: /\.(js|ts)x?$/, use: "babel-loader" }],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  stats: {
    entrypoints: false,
    modules: false,
  },
  node: false,
  externals: {
    // https://webpack.js.org/configuration/externals/#externals
    sharp: "commonjs2 sharp",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}

module.exports = [
  merge(baseConfig, {
    entry: "./src/main/main.entry",
    output: { filename: "main.js" },
    target: "electron-main",
  }),
  merge(baseConfig, {
    entry: {
      editor: "./src/renderer/editor.entry",
      capture: "./src/renderer/capture/capture.entry",
    },
    output: { filename: "[name].js" },
    target: "electron-renderer",
  }),
]
