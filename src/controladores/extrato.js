const { contas, depositos, saques, transferencias } = require("../bancodedados");
const { ehSenhaValidaParam, verificarContaInformadaParam, ehContaValidaQuery } = require("./validacaoDados");

function extrato(req, res) {
    const conta = contas.find((conta) => conta.numero === req.query.numero_conta);

    if (verificarContaInformadaParam(req, res) && ehContaValidaQuery(req, res) && ehSenhaValidaParam(req, res)) {
        const depositosContaAtual = [],
        saquesContaAtual = [],
        transferenciasEnviadas = [],
        transferenciasRecebidas = [];

        depositos.forEach(deposito => {
            if (deposito.numero_conta === conta.numero) {
                depositosContaAtual.push(deposito);
            }
        });

        saques.forEach(saque => {
            if (saque.numero_conta === conta.numero) {
                saquesContaAtual.push(saque);
            } 
        });

        transferencias.forEach(transferencia => {
            if (transferencia.numero_conta_origem === conta.numero) {
                transferenciasEnviadas.push(transferencia);
            } else if (transferencia.numero_conta_destino === conta.numero) {
                transferenciasRecebidas.push(transferencia);
            }
        });

        res.status(200);
        res.json({
            depositos: depositosContaAtual,
            saques: saquesContaAtual,
            transferenciasEnviadas: transferenciasEnviadas,
            transferenciasRecebidas: transferenciasRecebidas
        })
    }
}

module.exports = extrato;