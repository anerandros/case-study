/**
 * Configurazione microservizio writer per scrivere e leggere su database MySQL
 */
const express = require("express");
const app = express();
const port = 80;

app.use(express.json());

app.get("/", (req, res) => {
    res.send({
        status: "OK",
        message: "MySQL writer online",
    });
});

app.post("/user/save", (req, res) => {
    const parsedBody = req.body;
    if (parsedBody) {
        // microservizio che salva l'utente
        res.send(parsedBody);
    } else {
        res.end({
            status: "KO",
            message: "Error in input",
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    connectToDatabase();
});
