const { banco, contas } = require('../bancodedados');

function verificarPeloMenosUmCampo(req, res) {
    if (!(req.body.nome || req.body.cpf || req.body.data_nascimento || req.body.telefone || req.body.email || req.body.senha)) {
        res.status(400);
        res.json({ mensagem: "Insira pelo menos um campo a ser modificado"});
    } else {
        return true;
    }   
}

function verificarNomeInformado(req, res) {
    if (!req.body.nome) {
        res.status(400);
        res.json({ mensagem: "O nome é obrigatório."});
    } else {
        return true;
    }
}

function verificarCPFInformado(req, res) {
    if (!req.body.cpf) {
        res.status(400);
        res.json({ mensagem: "O CPF é obrigatório."});
    } else {
        return true;
    }
}

function verificarDataNascInformado(req, res) {
    if (!req.body.data_nascimento) {
        res.status(400);
        res.json({ mensagem: "A data de nascimento é obrigatória."});
    } else {
        return true;
    }
}

function verificarTelefoneInformado(req, res) {
    if (!req.body.telefone) {
        res.status(400);
        res.json({ mensagem: "O telefone é obrigatório."});
    } else {
        return true;
    }
}

function verificarEmailInformado(req, res) {
    if (!req.body.email) {
        res.status(400);
        res.json({ mensagem: "O email é obrigatório."});
    } else {
        return true;
    }
}

function verificarSenhaInformada(req, res) {
    if (!req.body.senha) {
        res.status(400);
        res.json({ mensagem: "A senha é obrigatória."});
    } else {
        return true;
    }
}

function verificarSaldoZerado(req, res) {
    const conta = contas.find((conta) => conta.numero === req.params.numeroConta);

    if (conta.saldo !== 0) {
        res.status(400);
        res.json({ mensagem: "O saldo precisa estar zerado."});
    } else {
        return true;
    }
}

function verificarValorPositivo(req, res) {
    if (req.body.valor <= 0) {
        res.status(400);
        res.json({ mensagem: "O valor precisa ser positivo."});
    } else {
        return true;
    }
}

function verificarValorInformado(req, res) {
    if (!req.body.valor) {
        res.status(400);
        res.json({ mensagem: "O valor é obrigatório."});
    } else {
        return true;
    }
}

function verificarPermissaoTransferencia(req, res) {
    const contaOrigem = contas.find((conta) => conta.numero === req.body.numero_conta_origem);
    const contaDestino = contas.find((conta) => conta.numero === req.body.numero_conta_destino);
    
    if (!req.body.numero_conta_origem) {
        res.status(400);
        res.json({ mensagem: "O número da conta de origem é obrigatório."});
    } else if (!req.body.numero_conta_destino) {
        res.status(400);
        res.json({ mensagem: "O número da conta de destino é obrigatório."});
    } else if (!req.body.senha) {
        res.status(400);
        res.json({ mensagem: "A senha da conta de origem é obrigatória."});
    } else if (!req.body.valor) {
        res.status(400);
        res.json({ mensagem: "O valor da transferência é obrigatório."});
    } else if (!contaOrigem) {
        res.status(400);
        res.json({ mensagem: "Conta " + req.body.numero_conta_origem + " não existe."});
    } else if (!contaDestino) {
        res.status(400);
        res.json({ mensagem: "Conta " + req.body.numero_conta_destino + " não existe."});
    } else if (contaOrigem.usuario.senha !== req.body.senha) {
        res.status(400);
        res.json({ mensagem: "Senha inválida."});
    } else if (contaOrigem.saldo < req.body.valor) {
        res.status(400);
        res.json({ mensagem: "Saldo insuficiente."});
    } else {
        return true;
    }
}

function verificarContaInformada(req, res) {
    if (!req.body.numeroConta) {
        res.status(400);
        res.json({ mensagem: "O número da conta é obrigatório."});
    } else {
        return true;
    }
}

function verificarContaInformadaParam(req, res) {
    if (!req.query.numero_conta) {
        res.status(400);
        res.json({ mensagem: "Número da conta não foi informado."});
    } else {
        return true;
    }
}

function verificarSaldoDisponivel(req, res) {
    const conta = contas.find((conta) => conta.numero === req.body.numeroConta);
    if (req.body.valor > conta.saldo) {
        res.status(400);
        res.json({ mensagem: "Saldo insuficiente."});
    } else {
        return true;
    }
}

function ehContaValida(req, res) {
    const conta = contas.find((conta) => conta.numero === req.params.numeroConta);

    if (!conta) {
        res.status(404);
        res.json({ mensagem: "Conta " + req.params.numeroConta + " não existe."});
    } else {
        return true;
    }
}

function ehContaValidaBody(req, res) {
    const conta = contas.find((conta) => conta.numero === req.body.numeroConta);

    if (!req.body.numeroConta) {
        res.status(400);
        res.json({ mensagem: "O  número da conta é obrigatório."});
    } else if (!conta) {
        res.status(400);
        res.json({ mensagem: "Conta " + req.body.numeroConta + " não existe."});
    } else {
        return true;
    }
}

function ehContaValidaQuery(req, res) {
    const conta = contas.find((conta) => conta.numero === req.query.numero_conta);

    if (!conta) {
        res.status(400);
        res.json({ mensagem: "Conta " + req.query.numero_conta + " não existe."});
    } else if (!req.query.numero_conta) {
        res.status(400);
        res.json({ mensagem: "O  número da conta é obrigatório."});
    } else {
        return true;
    } 
}

function ehCPFValido(req, res) {
    const encontrouCPF = cpfs.find((item) => item === req.body.cpf);

    if (!encontrouCPF) {
        return true;
    } else {
        res.status(400);
        res.json({ mensagem: "O CPF precisa ser válido"});
    }
}

function ehEmailValido(req, res) {
    const encontrouEmail = emails.find((item) => item === req.body.email);

    if (!encontrouEmail) {
        return true;
    } else {
        res.status(400);
        res.json({ mensagem: "O Email precisa ser válido"});
    }
}

function ehSenhaValida(req, res) {
    const conta = contas.find((conta) => conta.numero === req.body.numeroConta);
    if (conta.usuario.senha !== req.body.senha) {
        res.status(400);
        res.json({ mensagem: "A senha está inválida."});
    } else {
        return true;
    }
}

function ehSenhaValidaParam(req, res) {
    const conta = contas.find((conta) => conta.numero === req.query.numero_conta);
    
    if (!req.query.senha) {
        res.status(400);
        res.json({ erro: "Senha não informada."});
    } else if (req.query.senha !== conta.usuario.senha) {
        res.status(400);
        res.json({ erro: "Senha inválida."});
    } else {
        return true;
    }
}

const numeroConta = 1;
const cpfs = [];
const emails = [];


module.exports = {
    numeroConta, 
    cpfs, 
    emails,
    verificarPeloMenosUmCampo,
    verificarNomeInformado,
    verificarCPFInformado,
    verificarDataNascInformado,
    verificarTelefoneInformado,
    verificarEmailInformado,
    verificarSenhaInformada,
    verificarSaldoZerado,
    verificarValorPositivo,
    verificarValorInformado,
    verificarPermissaoTransferencia,
    verificarContaInformada,
    verificarContaInformadaParam,
    verificarSaldoDisponivel,
    ehContaValida,
    ehContaValidaBody,
    ehContaValidaQuery,
    ehCPFValido,
    ehEmailValido,
    ehSenhaValida,
    ehSenhaValidaParam
};