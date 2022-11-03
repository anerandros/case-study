const path = require("path");

module.exports = {
    entry: {
        creditagricole: "./models/creditagricole.class.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "prod"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
};
