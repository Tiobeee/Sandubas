module.exports = app => {
    const produto_pedidoController = require("../controllers/produto_pedido.controller");
    //routes: rota url
    // rota para criar m novo regirstro pedidos
    app.post("/produtos_pedidos", produto_pedidoController.create);
    //buscar todos os rgistros fr pedidos
    app.get("/produtos_pedidos", produto_pedidoController.findAll);
    //buscar apenas  um regsitro de pedidos
    app.get("/produtos_pedidos/:produto_pedidoId", produto_pedidoController.findById);
    //alterar um registro de pedidos
    app.put("/produtos_pedidos/:produto_pedidoId", produto_pedidoController.update);
    //excluir um registro de pedidos
    app.delete("/produtos_pedidos/:produto_pedidoId", produto_pedidoController.delete);
    //excluir todos os registros de pedidos
    app.delete("/produtos_pedidos", produto_pedidoController.deleteAll);

}