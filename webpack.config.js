import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  devServer: {
    watchFiles: ['src/**/*'], // Tells webpack to watch everything in your src folder
    hot: true,                  // Enables Hot Module Replacement
    liveReload: true,           // Forces a browser refresh when files change
    open: true,                 // Automatically opens your browser when you run the command
  },
  watchOptions: {
    poll: 1000, // Check for file updates every 1 second
    ignored: /node_modules/,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
