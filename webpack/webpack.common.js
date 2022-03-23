const Path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: Path.resolve(__dirname, "../src/scripts/index.js"),
  output: {
    path: Path.join(__dirname, "../dist"),
    filename: "js/[name].js",
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: Path.resolve(__dirname, "../src/images"), to: "images" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, "../src/index.html"),
    }),
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        type: "asset",
      },
    ],
  },
};
