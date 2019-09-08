const path = require('path');

module.exports = {
    entry: './dist/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'harmonized-viewer.bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts|\.tsx$/,
                include: path.resolve(__dirname, 'src'),
                loader: "ts-loader"
            }
        ]
    }
}