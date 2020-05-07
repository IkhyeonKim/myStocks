const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    entry: './resources/js/app.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './resources/index.html',
            filename: './index.html'
        })
    ]
}