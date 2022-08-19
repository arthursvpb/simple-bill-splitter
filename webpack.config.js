const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'dist'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.json',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    devServer: {
        compress: true,
        port: 8080,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            minify: false,
        }),
    ],
};
