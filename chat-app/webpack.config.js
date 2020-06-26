const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { get } = require('lodash');
const fs = require('fs');

const path = require('path');
const environment = require('./app/config/env.config.jsx');
const webpack = require('webpack');

const webPackConfig = {
  entry: './app/index.jsx',
  mode: environment.mode,
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.bundle.js',
    publicPath: `http://${environment.host}:${environment.port}/`,
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './app'),
      'node_modules',
    ],
    alias: {
      _static: path.resolve(__dirname, './static'),
      _utils: path.resolve(__dirname, './app/utils'),
      _config: path.resolve(__dirname, './app/config'),
      _reducers: path.resolve(__dirname, './app/reducers'),
      _actions: path.resolve(__dirname, './app/actions'),
      _components: path.resolve(__dirname, './app/components'),
      _models: path.resolve(__dirname, './app/models'),
      _app: path.resolve(__dirname, './app'),
    },
    extensions: [ '*', '.js', '.jsx' ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [ path.resolve(__dirname, './app/') ],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '../fonts/',
              publicPath: '../static/fonts',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-inline-loader',
          },
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [],
};

if (environment.mode === 'development') {
  webPackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webPackConfig.devServer = {
    contentBase: path.resolve(__dirname, './static'),
    hot: true,
    host: environment.host,
    port: environment.port,
    disableHostCheck: true,
    http2: false,
    https: false,
    publicPath: `http://${environment.host}:${environment.port}`,
    clientLogLevel: 'warning',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  };
  webPackConfig.watch = true;
  webPackConfig.watchOptions = {
    aggregateTimeout: 300,
    poll: 1000,
  };
}

if (environment.mode === 'production') {
  webPackConfig.devtool = 'source-map';
  webPackConfig.optimization = {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: [ 'default', { discardComments: { removeAll: true } } ],
        },
        canPrint: true,
      }),
    ],
  };
  // optimize styles
  webPackConfig.plugins.push(new MiniCssExtractPlugin({}));
  webPackConfig.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    exclude: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [ './src/styles' ],
          },
        },
      },
    ],
  });
}

module.exports = webPackConfig;
