const path = require("path");

module.exports = {
    entry: {
        microservice: "./microservice.ts",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "out"),
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
