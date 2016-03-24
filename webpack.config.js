// var BrowserSyncPlugin = require("browser-sync-webpack-plugin");
module.exports = {
  entry: "./public/js/app.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"

  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [`${__dirname}/babelRelayPlugin`]
        }
      }
    ]
  },
  // plugins: [
  //   new BrowserSyncPlugin({
  //     host: 'localhost',
  //     port: 4000,
  //     server: { baseDir: ['public'] }
  //   })
  // ]
}
