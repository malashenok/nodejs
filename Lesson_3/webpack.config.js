const path = require("path")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const isDevelopment = process.env.NODE_ENV === "development"

const getFileNameByEnv = (ext = "[ext]", name = "[name]") => {
  return isDevelopment ? `${name}.${ext}` : `${name}.[contenthash].${ext}`
}

module.exports = {
  target: "node",
  mode: process.env.NODE_ENV || "development",
  context: path.resolve(__dirname, "src"),
  node: {
    __dirname: true,
  },
  entry: {
    main: path.resolve(__dirname, "src/app.js"),
  },
  output: {
    filename: getFileNameByEnv("js"),
    path: path.resolve(__dirname, "dist"),
  },
  optimization: isDevelopment
    ? {}
    : {
        minimize: true,
      },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [],
    }),
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js"],
    alias: {
      "@app": path.resolve(__dirname, "src/"),
    },
  },
}
