const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

/* 
webpack-dev-server 관련 코드를 제거하고 CleanWebpackPlugin 설치하여 추가적으로 적용했다. 
CleanWebpackPlugin은 re-build될 때 기존의 결과물을 제거해준다. 
*/
const config = {
  entry: {
    index: "./javascripts/index.js",
    signin: "./javascripts/signin.js",
    signup: "./javascripts/signup.js",
    search: "./javascripts/search.js",
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "./dist"),
    assetModuleFilename: "[name][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // use의 경우 오른쪽에서 왼쪽으로 읽음.
        // sass -> css -> style-loader
        use: ["style-loader", "css-loader", "sass-loader"],
        // css-loader: css 파일을 import 가능, css 파일을 읽어줌
        // style-loader: 읽은 css 코드를 head 태그안에 넣어줌
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext][query]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
      inject: true,
      filename: path.resolve(__dirname, "dist/index.html"),
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./signin.html"),
      inject: true,
      filename: path.resolve(__dirname, "dist/signin.html"),
      chunks: ["signin"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./signup.html"),
      inject: true,
      filename: path.resolve(__dirname, "dist/signup.html"),
      chunks: ["signup"],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./search.html"),
      inject: true,
      filename: path.resolve(__dirname, "dist/search.html"),
      chunks: ["search"],
    }),
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ["dist"] }), // re-build될 때 기존의 결과물을 제거해준다
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["**/*.LICENSE.txt"],
      protectWebpackAssets: false,
    }), // re-build될 때 기존의 결과물을 제거해준다
  ],
};

module.exports = config;
