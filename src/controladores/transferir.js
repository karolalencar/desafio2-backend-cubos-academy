const { contas, transferencias } = require("../bancodedados");
const { format } = require("date-fns");
const { verificarPermissaoTransferencia } = require("./validacaoDados");

function transferir(req, res) {
    const contaOrigem = contas.find((conta) => conta.numero === req.body.numero_conta_origem);
    const contaDestino = contas.find((conta) => conta.numero === req.body.numero_conta_destino);
   
    if (verificarPermissaoTransferencia(req, res)) {
        const agora = new Date();

        contaOrigem.saldo -= req.body.valor;
        contaDestino.saldo += req.body.valor;
        transferencias.push({
            data: format(agora, "yyyy-MM-dd HH:mm:ss"),
            numero_conta_origem: contaOrigem.numero,
            numero_conta_destino: contaDestino.numero,
            valor: req.body.valor
        });
        res.status(200);
        res.json({ mensagem: "Transferência realizada com sucesso!"})
    }
}

module.exports = transferir;