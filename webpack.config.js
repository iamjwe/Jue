const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:["./src/js/entry.js","./src/index.html"],
    output:{
        path:resolve(__dirname,'build'),
        filename:'js/built.js'
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    esModule:false,
                    outputPath: 'images'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                exclude: /\.(html|js|css|less|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),// 项目构建后路径
        compress: true,// 启动gzip压缩
        port: 3000,// 端口号
        open: true,// 自动打开浏览器
        hot: true  // 启动模块热替换HMR
    },
    // 开发环境优选：'eval-source-map'，生产环境视情况而定（源代码是否要隐藏？调试是否要更友好？）。
    // eval：内联source-map，速度最快。source-map：定位源代码报错位置，调试最优。
    devtool: 'eval-source-map'
};

