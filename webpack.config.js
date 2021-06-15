/**  配置webpac配置文件
*    作者：尹云燕  2021-06-11
**/

const HtmlWebpackPlugin = require("html-webpack-plugin")
let path = require("path")
const { LoaderOptionsPlugin } = require("webpack")
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')




// 五大概念导出
module.exports = {
    // 入口  ：entry:导入文件
    entry: {
        commonCSS:"./src/js/commonCSS.js",
        index: "./src/js/index.js",
        register: "./src/js/register.js",
        login:"./src/js/login.js"
    },
    // 出口  ：output:对象里面 出口文件放置的位置【必须是绝对路径】： path:path.resolve(__dirname,"dist"),【】
    // 出口文件的文件名： filename: 文件名
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
        publicPath: "./"

    },
    // loader 解释器 ： module:对象 里面rules:数组 里面再对象里面再规则
    module: {
        rules: [
            // css的配置
            {
                // 使用什么loader 对什么格式的文件  进行解释
                // style-loader,将打包完成的css代码，添加到页面的 head-style标签中【在前】
                // css-loader，让webpack可以打包css代码【在后】
                test: /\.css$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, "css-loader"]
            },
            // less的配置
            {
                test: /\.less$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                },
                    "css-loader", "less-loader"]
            },
            // img图片的配置
            {
                test: /\.(jpg|png|gif)$/,
                loader: "url-loader",
                // 详细配置
                options: {
                    // hash随机32位字符，ext获取文件后缀
                    name: "[hash:16].[ext]",
                    // 小于20kb，base64压缩，大于20kb，不进行压缩
                    limit: 20 * 1024,
                    // 固定写法：以es模式打包
                    esModule: false,
                    outputPath: 'img'
                }
            },
            {
                test: /\.html$/, loader: "html-loader"
            },
            {
                test: /\.(svg|ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    outputPath: 'fonts'   //输出的目录
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',    // loader 编译es6为es5
                exclude: /node_modules/, // 排除            }
            },
        ]
    },
    // plugins   插件： plugins: 数组
    plugins: [
        new HtmlWebpackPlugin({
            // 以哪个页面作为打包的模板---打包那个页面
            template: "./src/page/index.html",
            filename: "index.html",
            chunks: ["index","commonCSS"]
        }),
        new HtmlWebpackPlugin({
            // 以哪个页面作为打包的模板---打包那个页面
            template: "./src/page/register.html",
            filename: "register.html",
            chunks: ["register"]
        }),
        new HtmlWebpackPlugin({
            // 以哪个页面作为打包的模板---打包那个页面
            template: "./src/page/login.html",
            filename: "login.html",
            chunks: ["login"]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        //plugin 添加
        new CleanWebpackPlugin()
    ],
    // mode   环境：development：本地开发环境，production：线上生成环境
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8081,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'index.html', // 打开的页面
    },
    target: "web", // 目标是浏览器
}