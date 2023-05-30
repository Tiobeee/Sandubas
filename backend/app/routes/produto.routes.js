module.exports = app => {
    const produtoController = require("../controllers/produto.controller");
    //routes: rota url
    // rota para criar m novo regirstro produto
    app.post("/produtos", produtoController.create);
    //buscar todos os rgistros fr produtos
    app.get("/produtos", produtoController.findAll);
    //buscar apenas  um regsitro de produto
    app.get("/produtos/:produtoId", produtoController.findById);
    //alterar um registro de produto
    app.put("/produtos/:produtoId", produtoController.update);
    //excluir um registro de produtoas
    app.delete("/produtos/:produtoId", produtoController.delete);
    //excluir todos os registros de produto
    app.delete("/produtos", produtoController.deleteAll);

}