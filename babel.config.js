module.exports = {
  presets: [
    ["@babel/env", { targets: { node: 12 } }],
    "@babel/typescript",
    "@babel/react",
    "@emotion/css-prop",
  ],
  plugins: ["macros"],
}
