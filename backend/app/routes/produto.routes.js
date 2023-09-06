module.exports = app => {
    const produtoController = require("../controllers/produto.controller");
    const authJwt = require("../middlewares/auth_jwt_middleware.js");

    //routes: rota url
    // rota para criar m novo regirstro produto
    app.post("/produtos", [authJwt.verifyToken, authJwt.IsAdmin], produtoController.create);
    //buscar todos os rgistros fr produtos
    app.get("/produtos", [authJwt.verifyToken, authJwt.IsBalcao],produtoController.findAll);
    //buscar apenas  um regsitro de produto
    app.get("/produtos/:produtoId", [authJwt.verifyToken], produtoController.findById);
    //alterar um registro de produto
    app.put("/produtos/:produtoId", [authJwt.verifyToken], produtoController.update);
    //excluir um registro de produtoas
    app.delete("/produtos/:produtoId", [authJwt.verifyToken], produtoController.delete);
    //excluir todos os registros de produto
    app.delete("/produtos", [authJwt.verifyToken], produtoController.deleteAll);

}
