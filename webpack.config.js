
// webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const KssWebpackPlugin = require('kss-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const KssConfig = {
	title: "Title of the Style Guide",
  source: 'src/sass/',
  destination: "dist/styleguide/",
  builder: 'node_modules/michelangelo/kss_styleguide/custom-template/',
  chunks: ['main']
};


module.exports = {
  entry: { 
  	main: './src/sass/main.scss' 
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
     {
        test: /\.s[c|a]ss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
       {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
            	name: 'img/[name]-[hash].[ext]',
              limit: 5000
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
              name: 'fonts/[name]-[hash].[ext]',
              mimetype: 'application/font-woff'
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    new CopyWebpackPlugin([
        {from:'src/img',to:'img'}
		]),
		new KssWebpackPlugin(KssConfig),
		new StyleLintPlugin({
			context: 'src/sass',
			emitErrors: false
		}),
  ]
};