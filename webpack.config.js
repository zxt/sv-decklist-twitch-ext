const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        config: './src/config.js',
        live_config: './src/live_config.js',
        panel: './src/panel.js',
        video_overlay: './src/video_overlay.js',
        video_component: './src/video_component.js',
        mobile: './src/mobile.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        minimize: false,
    },
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'SV Decklist - Config',
            filename: 'config.html',
            template: 'public/config.html',
            chunks: ['config'],
        }),
        new HtmlWebpackPlugin({
            title: 'SV Decklist - Live Config',
            filename: 'live_config.html',
            template: 'public/live_config.html',
            chunks: ['live_config'],
        }),
        new HtmlWebpackPlugin({
            title: 'SV Decklist',
            filename: 'panel.html',
            template: 'public/panel.html',
            chunks: ['panel'],
        }),
        new HtmlWebpackPlugin({
            title: 'SV Decklist - Overlay',
            filename: 'video_overlay.html',
            template: 'public/video_overlay.html',
            chunks: ['video_overlay'],
        }),
        new HtmlWebpackPlugin({
            title: 'SV Decklist - Component',
            filename: 'video_component.html',
            template: 'public/video_component.html',
            chunks: ['video_component'],
        }),
        new HtmlWebpackPlugin({
            title: 'SV Decklist - Mobile',
            filename: 'mobile.html',
            template: 'public/mobile.html',
            chunks: ['mobile'],
        })
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
};