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
        entry: './resources/js/app.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                          presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './resources/index.html',
                filename: './index.html'
            })
        ]
    }
]