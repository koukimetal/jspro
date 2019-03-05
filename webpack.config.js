const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const fs = require('fs-extra');

const SOURCE_ROOT = path.resolve(__dirname, 'back', 'contests');

const fileExplorer = async (currentPath, entry) => {
    const stats = await fs.stat(currentPath);
    if (stats.isDirectory()) {
        const items = await fs.readdir(currentPath);
        await Promise.all(items.map(async (item) => {
            const itemPath = path.resolve(currentPath, item);
            await fileExplorer(itemPath, entry);
        }));
    } else {
        const relativePath = currentPath.replace(SOURCE_ROOT, '');
        const name = relativePath.replace(/\//g, '_').replace(/^_|\.ts$/g, '');
        entry[name] = currentPath;
    }
}

module.exports = async () => {
    const entry = {};
    await fileExplorer(SOURCE_ROOT, entry);
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
        }
    });
};
