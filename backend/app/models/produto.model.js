const sql = require("./db.js");
// model: define estrutura da database (tabela no mysql)
//construtor
const ProdutoModel = function(produto){
    this.name = produto.nome;
    this.valor = produto.valor;
}

//cria novo produto no banco
ProdutoModel.create = (produto,result) => {
    sql.query("insert into produtos set ?", produto, (err, res) => {
        if (err){
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        console.log("Produto criado: ", {idprodutos: res.insertId, ...produto});
        result(null, {idprodutos: res.insertId, ...produto});
    })
};

//seleciona produto por ID
ProdutoModel.findById = (produtoId, result) => {
    sql.query("Select * from produtos where idprodutos = " +produtoId, (err, res) => {
        if (err){
            console.log("erro: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("Produto encontrado", res[0]);
            result(null, res[0]);
        } else{
            result({type: "not_found"}, null);
            console.log("produto não encontrado");
        }
    })
};


//seleciona todos os produtos
ProdutoModel.getAll = result => {
    sql.query("SELECT * FROM produtos", (err, res) => {
        if (err){
            console.log("erro:", err); 
            result(null, err);
            return;
        }

        console.log("produto: ", res);
        result(null, res);
    })
};

//atualizar produto por id
ProdutoModel.updateById = (produtoId, produto, result) => {
};

//remover produto por id
ProdutoModel.remove = (produtoId, result) => {
};

//remover todos os prdutos 
ProdutoModel.removeAll = (result) =>{
};
module.exports = ProdutoModel;