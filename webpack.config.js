const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/, // 정규표현식
        // use는 오른쪽에서 왼쪽으로 해석, 즉 sass-loader 적용 후 css-laoder가 적용
        // sass-loader는 .scss 파일을 .css 파일로 변환 시켜줘야 하기 때문에 css-loader보다 우선순위가 높다
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [
          {
            // loader: "file-loader",
            // file-loader의 기능을 base로 작은 파일이나, 글꼴은 파일로 복사하지 않고 toString('base64') 로 문자열로 변환하여 bundle 파일에 넣는다
            loader: "url-loader",
            options: {
              name: "images/[name].[ext]?[hash]",
              limit: 10000, // 10KB 미만의 파일을 url-loader로 처리
            },
          },
        ],
      },
    ],
  },
  /* webpack-dev-server */
  /* webpack-dev-server의 빌드 결과물은 사실, 실제 파일로 빌드되진 않고 메모리에 저장된다. */
  mode: "development", // webpack-dev-server에만 쓰는 것은 아님
  devtool: "inline-source-map", // webpack-dev-server에만 쓰는 것은 아님
  devServer: {
    contentBase: "./dist",
    port: 3000,
    hot: true,
  },
  /* webpack-dev-server */

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css", // 원하는 filename
    }),
    new HtmlWebpackPlugin({
      // 꼭 index.html 아니여도됨
      template: path.resolve(__dirname, "./public/index.html"),
      inject: true,
      filename: path.resolve(__dirname, "./dist/index.html"),
    }),
  ],
};

module.exports = config;
