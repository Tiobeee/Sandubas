const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({
        message: "Bem vindo à API MVC do senac"
    })

});

app.listen(3000, () => {
    console.log("servidor rodando na porta 3000");
})