// @ts-check
const merge = require("webpack-merge")
const path = require("path")

/** @type {import('webpack').Configuration} */
const baseConfig = {
  output: {
    path: path.join(__dirname, "build"),
    publicPath: ".",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: "babel-loader",
        include: path.join(__dirname, "src"),
      },
    ],
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

  // this doesn't work with electron :(
  // figure it out later
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
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
