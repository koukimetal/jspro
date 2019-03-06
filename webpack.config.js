const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const glob = require('glob');

module.exports = () => {
    const entry = glob.sync("./back/contests/**/*.ts").reduce(
        (ac, path) => {
            ac[path.replace(/(^\.\/back\/contests\/|\.ts$)/g, '')] = path;
            return ac;
        }, {});
    return ({
        target: 'node',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },
        externals: [nodeExternals()],
        entry,
        module: {
            rules: [
                { test: /\.ts$/, loader: "ts-loader", exclude: /node_modules/ }
            ]
        },
        resolve: {
            plugins: [
                new TsconfigPathsPlugin({ configFile: "./back/tsconfig.json" }),
            ],
            extensions: ['.ts', '.js']
        },
        devtool: 'source-map'
    });
};
