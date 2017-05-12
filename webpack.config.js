var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var isProd = process.env.NODE_ENV === "production"; // true or false
var cssDev = ['style-loader','css-loader','sass-loader'];
var cssProd = ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: ["css-loader", "sass-loader"],
      publicPath: "/dist"
    });
var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  context: __dirname,
  entry: './src/App.js',
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'app.bundle.js'
  },
  devServer: {
    publicPath: '/dist/',
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    // port: 9000,
    hot: true,
    stats: "errors-only",
    open: true
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?images/name=[name].[ext]&outputPath=images/'
      },
      {
        test: /\.scss$/,
        use: cssConfig // changes based on production or development
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "app.css",
      // disable: false // doesn't work with hot module replacement
      disable: !isProd
    }),
    new HtmlWebpackPlugin({
      title: 'Financial Forecaster',
      // minify: {
      //   collapseWhitespace: true
      // },
      hash: true,
      template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
