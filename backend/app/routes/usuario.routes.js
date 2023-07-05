module.exports = app => {
    const usuarioController = require("../controllers/usuario.controller.js");

    app.post("/signup", usuarioController.signUp);
    app.post("/signin", usuarioController.signIn);
}

