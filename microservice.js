/**
 * Import della libreria MySQL
 */
const { MySQLManager } = require("./mysql");

/**
 * Configurazione microservizio writer per scrivere e leggere su database MySQL
 */
const express = require("express");
const app = express();
const port = 3000;

/**
 * Router microservizio
 */
const userRouter = require("./routers/user.router");
const bankRouter = require("./routers/bank.router");
const productRouter = require("./routers/product.router");
const prospectRouter = require("./routers/prospect.router");

app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/bank", bankRouter);
app.use("/product", productRouter);
app.use("/prospect", prospectRouter);

app.get("/", (req, res) => {
    res.send({
        status: "OK",
        message: "Microservice online",
    });
});

app.listen(port, () => {
    console.log(`[Log] [Microservice] Server started at localhost on port ${port}`);
    MySQLManager.connectToDatabase();
});
