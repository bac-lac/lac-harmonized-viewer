const path = require('path');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'web',
    entry: [
        './src/sass/index.scss',
        './src/index.ts'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'harmonized-viewer.bundle.js',
        library: 'HV'
    },
    resolve: {
        extensions: ['.scss', '.ts', '.tsx', '.js']
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'node_modules/openseadragon/build/openseadragon',
            to: 'vendors/openseadragon'
        }])
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'harmonized-viewer.bundle.css',
                        },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: ['./node_modules']
                            },
                        }
                    },
                ]
            },
            {
                test: /\.ts|\.tsx$/,
                include: path.resolve(__dirname, 'src'),
                loader: "ts-loader"
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                include: path.resolve(__dirname, 'node_modules/openseadragon'),
                loader: "file-loader",
                options: {
                    path: 'openseadragon'
                }
            }
        ]
    }
}