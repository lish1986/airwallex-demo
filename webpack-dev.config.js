const path = require('path');
const config = require('./package.json');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const proxy = require('http-proxy-middleware');
module.exports = {

    entry: {
        index: path.resolve(__dirname, 'src/index'),
    },

    output: {
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        path: path.join(__dirname, '/dist'),
        publicPath: '/dist/',
    },

    devtool: 'cheap-module-eval-source-map', //不会包含列信息，速度最快，能加速构建，但开发模式不会压缩代码，所以不影响debug
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/prod/*': {
                target: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/',
                pathRewrite: {
                    '^/prod': '/prod/fake-auth', // rewrite path
                },
                secure: false,
                changeOrigin: true,
            },
        },
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(jpg|png)$/,
                use: 'url-loader'
            },
            { 
                test: /\.css$/, 
                use: ['style-loader', 'css-loader']
            },  // 把css处理成内联style，动态插入到页面
            {
                // expose-loader将需要的变量从依赖包中暴露出来
                test: require.resolve('jquery'),
                use: 'expose-loader?$!expose-loader?jQuery',
            },
        ],
    },

    plugins: [
        new ExtractTextPlugin('[name].css', {
            allChunks: true,
        }),
        new HtmlWebpackPlugin()
    ],
}
