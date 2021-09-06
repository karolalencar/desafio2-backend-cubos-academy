const { contas, depositos } = require("../bancodedados");
const { format } = require("date-fns");
const { verificarValorPositivo, verificarValorInformado, ehContaValidaBody } = require("./validacaoDados");

function depositar(req, res) {
    const conta = contas.find((conta) => conta.numero === req.body.numeroConta);

    if (ehContaValidaBody(req, res) && verificarValorInformado(req, res) && verificarValorPositivo(req, res) ) {
        const agora = new Date();

        conta.saldo += req.body.valor;

        depositos.push({
            data: format(agora, "yyyy-MM-dd HH:mm:ss"),
            numero_conta: conta.numero,
            valor: req.body.valor
        });
        res.status(200);
        res.json({ mensagem: "Depósito realizado com sucesso!"});
    }
}

module.exports = depositar;