var path = require("path");
var CopyPlugin = require("copy-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    all: "./app/assets/all.js",
    application: "./app/assets/sass/application.scss",
    "application-ie8": "./app/assets/sass/application-ie8.scss",
  },
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader?url=false",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  output: {
    filename: "javascript/[name].js",
    path: path.resolve(__dirname, "public/assets"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/govuk-frontend/govuk/assets",
          to: path.resolve(__dirname, "public/assets"),
        },
        {
          from: "src/moj/assets",
          to: path.resolve(__dirname, "public/assets"),
        },
        {
          from: "app/assets/images",
          to: path.resolve(__dirname, "public/assets/images"),
        },
        {
          from: "src/moj/vendor",
          to: path.resolve(__dirname, "public/assets/javascript"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "stylesheets/[name].css",
    }),
  ],
};
