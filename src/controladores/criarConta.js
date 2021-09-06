const { contas } = require('../bancodedados');
const { cpfs, emails, ehCPFValido, ehEmailValido, verificarNomeInformado, verificarCPFInformado, verificarDataNascInformado, verificarTelefoneInformado, verificarEmailInformado, verificarSenhaInformada } = require('./validacaoDados');
let numeroConta = 1;

function criarConta(req, res) {
    if (verificarNomeInformado(req, res) && verificarCPFInformado(req, res) && verificarDataNascInformado(req, res) && verificarTelefoneInformado(req, res) && verificarEmailInformado(req, res) && verificarSenhaInformada(req, res) && ehCPFValido(req, res) && ehEmailValido(req, res) ) {
        contas.push({
            numero: numeroConta.toString(),
            saldo: 0,
            usuario: {
                nome: req.body.nome,
                cpf: req.body.cpf,
                data_nascimento: req.body.data_nascimento,
                telefone: req.body.telefone,
                email: req.body.email,
                senha: req.body.senha
            }
        })
        res.status(201);
        res.json(contas[contas.length - 1]);
        cpfs.push(req.body.cpf);
        emails.push(req.body.email);
        numeroConta++;
    }  
}

module.exports = criarConta;