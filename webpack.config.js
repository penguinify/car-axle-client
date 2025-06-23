const path = require('path')
module.exports = {
    entry: './src/index.ts', // Entry point of your application
    mode: 'development', // Or 'development' for non-minified output
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve('src/'),
        },
    },
    devServer: {
        host: 'localhost',
        static: {
            directory: path.join(__dirname, 'docs/testing'),
        },
        port: 6969,
        open: true,
        hot: true,
        client: {
            overlay: false,
        },
    },
    output: {
        filename: 'index.js', // Output bundle filename
        // path: path.resolve(__dirname, 'build'), // Output directory
        path: path.resolve(__dirname, 'docs/testing'), // testing directory
    },
}
