var path = require("path");
var CopyPlugin = require("copy-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    all: "./assets/all.js",
    application: "./assets/sass/application.scss",
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
            loader: "css-loader",
            options: {
              url: false,
            }
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
          from: "node_modules/govuk-frontend/dist/govuk/assets",
          to: path.resolve(__dirname, "public/assets"),
        },
        {
          from: "src/moj/assets",
          to: path.resolve(__dirname, "public/assets"),
          force: true,
        },
        {
          from: "assets/images",
          to: path.resolve(__dirname, "public/assets/images"),
          force: true,
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
