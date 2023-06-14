const sql = require("./db.js");
// model: define estrutura da database (tabela no mysql)
//construtor
const PedidoModel = function(pedido){
    this.hora = pedido.hora;
    this.status = pedido.status;
}

//cria novo pedido no banco
PedidoModel.create = (pedido,result) => {
    sql.query("insert into pedidos set ?", pedido, (err, res) => {
        if (err){
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Pedido criado: ", {idpedidos: res.insertId, ...pedido});
        result(null, {idpedidos: res.insertId, ...pedido});
    })
};

//seleciona pedido por ID
PedidoModel.findById = (pedidoId, result) => {
    sql.query("Select * from pedidos where idpedidos = " +pedidoId, (err, res) => {
        if (err){
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Pedido encontrado", res[0]);
            result(null, res[0]);
        } else{
            result({type: "not_found"}, null);
            console.log("pedido não encontrado");
        }
    })
};

//seleciona todos os pedidos
PedidoModel.getAll = result => {
    sql.query("SELECT * FROM pedidos", (err, res) => {
        if (err){
            console.log("erro:", err); 
            result(null, err);
            return;
        }

        console.log("pedido: ", res);
        result(null, res);
    })
};

//atualizar pedidos por id
PedidoModel.updateById = (pedidoId, pedido, result) => {
    sql.query("UPDATE pedidos set hora = ?, status = ? WHERE idpedidos = ?", [pedido.hora, pedido.status, pedidoId], (err, res) => {
            if(err){
                console.log("erro: ", err);
                result(null, err);
            } else if (res.affectedRows == 0) {
                result({ type: "not_found"}, null);
            } else {
                console.log("Pedido atualizado: ", {idpedidos: pedidoId, ...pedido});
                result(null, {idpedidos: pedidoId, ...pedido});
            }
        });
    };

//remover pedidos por id
PedidoModel.remove = (pedidoId, result) => {
    sql.query("DELETE FROM pedidos WHERE idpedidos = ?", pedidoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else if (res.affectedRows == 0){
            result({ type: "not_found"}, null);
        } else {
            result(null, res);
        }
    });
};

//remover todos os pedidos 
PedidoModel.removeAll = (result) =>{
    sql.query("DELETE FROM pedidos", pedidoId, (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = PedidoModel;