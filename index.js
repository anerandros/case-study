const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
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
});
