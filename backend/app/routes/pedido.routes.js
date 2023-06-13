module.exports = app => {
    const pedidoController = require("../controllers/pedido.controller");
    //routes: rota url
    // rota para criar m novo regirstro pedidos
    app.post("/pedidos", pedidoController.create);
    //buscar todos os rgistros fr pedidos
    app.get("/pedidos", pedidoController.findAll);
    //buscar apenas  um regsitro de pedidos
    app.get("/pedidos/:pedidoId", pedidoController.findById);
    //alterar um registro de pedidos
    app.put("/pedidos/:pedidoId", pedidoController.update);
    //excluir um registro de pedidos
    app.delete("/pedidos/:pedidoId", pedidoController.delete);
    //excluir todos os registros de pedidos
    app.delete("/pedidos", pedidoController.deleteAll);

}