const { contas } = require("../bancodedados");
const { ehContaValida, verificarSaldoZerado } = require("./validacaoDados");

function excluirConta(req, res) {
    if (ehContaValida(req, res) && verificarSaldoZerado(req, res)) {
        const conta = contas.find((conta) => conta.numero === req.params.numeroConta);

        const contaASerExcluida = contas.indexOf(conta);

        contas.splice(contaASerExcluida, 1);

        res.status(200);
        res.json({ mensagem: "Conta exluída com sucesso!"});
    }
}
    

module.exports = excluirConta;