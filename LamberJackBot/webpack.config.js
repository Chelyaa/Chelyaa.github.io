module.exports = {
	context: __dirname + "/src/",
  entry: "./bot.js",
  output: {
    path: __dirname + "/build",
    filename: "content.js"
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
    ]
  }
};