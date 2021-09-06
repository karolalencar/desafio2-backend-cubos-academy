const { contas, saques } = require("../bancodedados");
const { format } = require("date-fns");
const { ehContaValidaBody, verificarValorInformado, verificarSenhaInformada, ehSenhaValida, verificarSaldoDisponivel } = require("./validacaoDados");

function sacar(req, res) {
    const conta = contas.find((conta) => conta.numero === req.body.numeroConta);

    if (ehContaValidaBody(req, res) && verificarValorInformado(req, res) && verificarSenhaInformada(req, res) && ehSenhaValida(req, res) && verificarSaldoDisponivel(req, res)) {
        const agora = new Date();

        conta.saldo -= req.body.valor;
        saques.push({
            data: format(agora, "yyyy-MM-dd HH:mm:ss"),
            numero_conta: conta.numero,
            valor: req.body.valor
        });
        res.status(200);
        res.json({ mensagem: "Saque realizado com sucesso!"});
    }
}

module.exports = sacar;