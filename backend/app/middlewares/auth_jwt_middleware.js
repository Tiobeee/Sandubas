const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const usuarioModel = require("../models/usuario.model.js");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token){
        return res.status(403).send({
            message: "Não possui token para autenticação"
        });
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err){
                res.status(401).send({
                    message: "Acesso não autorizado. Credenciais inválidas."
                });
            } else {
                req.usuarioId = decoded.id;
                next();
            }
        });
    }
}

IsAdmin = (req, res, next) => {
    usuarioModel.findById(req.usuarioId, (err, data) => {
        if (data.tipo == 1){
            next();
        } else {
            res.status(403).send({
                message: "Você precisa ser admin para executar a ação!"
            })
        }
    });
}

IsBalcao = (req, res, next) => {
    usuarioModel.findById(req.usuarioId, (err, data) => {
        if(data.tipo == 1 || data.tipo == 2){
            next();
        } else {
            res.status(403).send({
                message: "Você precisa ser da cozinha para excutar a ação"
            })
        }
    });
}

IsCozinha = (req, res, next) => {
    usuarioModel.findById(req.usuarioId, (err, data) => {
        if(data.tipo == 1 || data.tipo == 3){
            next();
        } else {
            res.status(403).send({
                message: "Você precisa ser da cozinha para excutar a ação"
            })
        }
    });
}

module.exports = {
    verifyToken: verifyToken,
    IsAdmin: IsAdmin,
    IsBalcao: IsBalcao,
    IsCozinha: IsCozinha,
}