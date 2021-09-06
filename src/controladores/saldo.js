const { contas } = require("../bancodedados");
const { ehContaValida, ehSenhaValidaParam, verificarContaInformadaParam, ehContaValidaQuery } = require("./validacaoDados");

function saldo(req, res) {
    const conta = contas.find((conta) => conta.numero === req.query.numero_conta);
    
    if (ehContaValidaQuery(req, res) && ehSenhaValidaParam(req, res) && verificarContaInformadaParam(req, res)){
        res.status(200);
        res.json({ saldo: conta.saldo});
    }
}

module.exports = saldo;