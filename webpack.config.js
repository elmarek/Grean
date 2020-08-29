var path = require("path");
var SRC_DIR = path.join(__dirname, "/src");
var DIST_DIR = path.join(__dirname, "/dist");

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[path][name].[hash].[ext]',
          outputPath: 'assets/imgs'
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]',
            outputPath: 'assets/imgs'
          }
        },
      },
    ],
  },
};
