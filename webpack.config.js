const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: ['./src/sass/index.scss', './src/index.ts'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        library: 'HV'
    },
    resolve: {
        extensions: ['.scss', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                //include: [{ path.resolve(__dirname, 'src') }, { path.resolve(__dirname, 'node_modules') }],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'bundle.css',
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
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env'],
                },
            }
        ]
    }
}