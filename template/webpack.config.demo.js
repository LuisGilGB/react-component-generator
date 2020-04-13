const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "demo-app/public/index.html"),
    filename: "./index.html"
});

module.exports = {
    entry: path.join(__dirname, "demo-app/src/index.js"),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        htmlWebpackPlugin,
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
            PUBLIC_URL: publicUrl
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        clientLogLevel: 'none',
        contentBase: path.join(__dirname, 'demo-app/public'),
        hot: true,
        port: process.env.DEMO_PORT || 3000
    }
};