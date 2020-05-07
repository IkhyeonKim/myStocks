const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
    {
        name: 'server',
        target: 'node',
        entry: './resources/database/mysql.js',
        output: {
            filename: 'serverMain.js',
            path: path.resolve(__dirname, 'dist')
        }

    },

    {
        name: 'client',
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
        },
        entry: './resources/database/mysql.js',
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
]