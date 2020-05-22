// @ts-check
const { exec } = require("child_process")
const webpack = require("webpack")
const config = require("../webpack.config")

/** @type {import('child_process').ChildProcess | undefined} */
let child

webpack(config).watch({}, (error, stats) => {
  if (stats.hasErrors()) {
    console.error(error)
  }
  console.info(stats.toString({ modules: false, entrypoints: false }))

  if (child) child.kill("SIGINT")
  child = exec(".\\node_modules\\.bin\\electron build/main.js --dev")
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
})
