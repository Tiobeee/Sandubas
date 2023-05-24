const sql = require("./db.js");
//Construtor
const ProdutoModel = function (produto) {
    this.name = produto.nome;
    this.valor = produto.valor;
}

//cria novo produto no banco
ProdutoModel.create = (produto, result) => { };

//seleciona produto por id
ProdutoModel.findById = (produtoId, result) => { };

//seleciona todos os produtos
ProdutoModel.getAll = result => {
    sql.query("SELECT * FROM produtos", (err, res) => {
        if (err) {
            console.log("erro: ", err);
            result(null, err);
            return;
        }

        console.log("produto: ", res);
        result(null, res);
    })
};

//atualizar produto por id
ProdutoModel.updateById = (produtoId, produto, result) => { };

//remover produto por id 
ProdutoModel.remove = (produtoId, result) => { };

ProdutoModel.removeAll = (result) => { };
module.exports = ProdutoModel;