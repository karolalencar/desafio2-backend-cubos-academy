const { banco, contas } = require('../bancodedados');

function listarContas(req, res) {
    if (!req.query.senha_banco) {
        res.status(400);
        res.json({ erro: "Senha não informada."});
    } else if (req.query.senha_banco !== banco.senha) {
        res.status(400);
        res.json({ erro: "Senha inválida."});
    } else {
        res.status(200);
        res.json(contas);
    }       
}

module.exports = listarContas;