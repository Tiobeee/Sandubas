const produto_pedidoModel = require("../models/produto_pedido.model")
// controller: interligação banco de dados e frontend; segurança; quem pode acessar o que ; limites usuario
exports.create = (req, res) => {
    if(!req.body.observacao || !req.body.produtos_idprodutos  || !req.body.pedidos_idpedidos){
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produto_pedido = new produto_pedidoModel({
            observacao: req.body.observacao,
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos

        });

        produto_pedidoModel.create(produto_pedido, (err, data) =>{
            if (err){
                res.status(500).send({
                    message: err.message || "Ocorreu um erro ao inserir os dados"
                });
            } else {
                res.send(data);
            }
        });
    }
}

exports.findAll = (req, res) => {
    produto_pedidoModel.getAll((err, data) => {
        if (err){
            res.status(500).send({
                message:err.message || "ocorreu erro desconhecido"
            });
        } else {
            res.send(data);
        }
    });
}

exports.findById = (req, res) => {
    produto_pedidoModel.findById(req.params.produto_pedidoId, (err, data) => {
        if (err){
            if(err.type == "not_found"){
                res.status(404).send({
                    message: "produto não encontrado. ID: "+req.params.produto_pedidoId
                });
            } else {
                res.status(500).send({
                    message:"erro ao retornar o produto com ID: " +req.params.produto_pedidoId
                });
            }
        } else {
            res.send(data);
        }
    })
}

exports.update = (req, res) => {
    if (!req.body.observacao || !req.body.produtos_idprodutos  || !req.body.pedidos_idpedidos) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produto_pedido = new produto_pedidoModel({
            observacao: req.body.observacao,
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos
        });

        // }tira daqui
        produto_pedidoModel.updateById(req.params.produto_pedidoId, produto_pedido, (err, data) => {
            if (err) {
                if (err.type == "not-found") {
                    res.status(400).send({
                        message: "Produto_pedido não encontrado."
                    })
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar produto_pedido."
                    })
                }
            }
            else {
                res.send(data);
            }
        });
    }
}
exports.delete = (req, res) => {
    produto_pedidoModel.remove(req.params.produto_pedidoId, (err, data) => {
        if (err) {
            if (err.type == "not_found"){
                res.status(404).send({message:"Produto_Pedido não encontrado."})
            } else {
                res.status(500).send({message:"Erro ao deletar produto_pedido."})
            }
        } else {
            res.send({message: "Produto_pedido deletado com sucesso"});
        }
    })
}
exports.deleteAll = (req, res) => {
    produto_pedidoModel.removeAll((err, data) => {
        if(err){
            res.status(500).send({message: "Erro ao deletar produto_pedido"})
        } else {
            res.send({message: "TODOS os produtos_pedido foram deletados:)"});
        }
    })
}

