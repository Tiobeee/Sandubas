const produtoModel = require("../models/produto.model")
// controller: interligação banco de dados e frontend; segurança; quem pode acessar o que ; limites usuario
exports.create = (req, res) => {
    if(!req.body.nome || !req.body.valor){
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produto = new produtoModel({
            nome: req.body.nome,
            valor: req.body.valor
        });

        produtoModel.create(produto, (err, data) =>{
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
    produtoModel.getAll((err, data) => {
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
    produtoModel.findById(req.params.produtoId, (err, data) => {
        if (err){
            if(err.type == "not_found"){
                res.status(404).send({
                    message: "produto não encontrado. ID: "+req.params.produtoId
                });
            } else {
                res.status(500).send({
                    message:"erro ao retornar o produto com ID: " +req.params.produtoId
                });
            }
        } else {
            res.send(data);
        }
    })
}

exports.update = (req, res) => {
    if (!req.body.nome || !req.body.valor){
        res.status(400).send({
            message: "Conteúdo do corpo da requisição vazia."
        });
    } else {
        const produto = new produtoModel({
            nome: req.body.nome,
            valor:req.body.valor
        });
    
    // }tira daqui
    produtoModel.updateById(req.params.produtoId, produto, (err, data) => {
        if (err) {
            if (err.type == "not-found") {
                res.status(400).send({
                    message: "Produto não encontrado."
                })
            } else {
                res.status(500).send({
                    message: "Erro ao atualizar produto."
                })
            } }
            else {
                res.send(data);
            }
    })
}
}
exports.delete = (req, res) => {}
exports.deleteAll = (req, res) => {}

