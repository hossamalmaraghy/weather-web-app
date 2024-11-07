const MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    TerserPlugin = require("terser-webpack-plugin"),
    path = require("path"),
    common = require("./webpack.common.js");
const { merge } = require("webpack-merge"),
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: "hidden-source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
        ]
    },
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Client',
        clean: true,
    },
    optimization: {
        minimize: true,
        minimizer: [        
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'style.[contenthash].css'
        }),
        new GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
          runtimeCaching: [
            {
              urlPattern: /\.(?:html|css|js)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'static-resources',
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'image-cache',
              },
            },
          ],
        }),
      ]
});
