const { contas } = require("../bancodedados");
const { verificarPeloMenosUmCampo, ehContaValida, ehCPFValido, ehEmailValido } = require("./validacaoDados");

function atualizarUsuarioConta(req, res) {
    if (verificarPeloMenosUmCampo(req, res) && ehContaValida(req, res) && ehCPFValido(req, res) && ehEmailValido(req, res)) {
        // FALTA ATUALIZAR OS DADOS
        const conta = contas.find((conta) => conta.numero === req.params.numeroConta);
        if (req.body.nome) {
            conta.usuario.nome = req.body.nome;
        }
        if (req.body.cpf) {
            conta.usuario.cpf = req.body.cpf;
        }
        if (req.body.data_nascimento) {
            conta.usuario.data_nascimento = req.body.data_nascimento;
        }
        if (req.body.telefone) {
            conta.usuario.telefone = req.body.telefone;
        }
        if (req.body.email) {
            conta.usuario.email = req.body.email;
        }
        if (req.body.senha) {
            conta.usuario.senha = req.body.senha;
        }
        res.status(200);
        res.json({ mensagem: "Conta atualizada com sucesso"});
   }
}

module.exports = atualizarUsuarioConta;