const express = require("express");

const criarConta = require("./controladores/criarConta");
const listarContas = require("./controladores/listarContas");
const atualizarUsuarioConta = require("./controladores/atualizarUsuarioConta");
const excluirConta = require("./controladores/excluirConta");
const depositar = require("./controladores/depositar");
const sacar = require("./controladores/sacar");
const transferir = require("./controladores/transferir");
const saldo = require("./controladores/saldo");
const extrato = require("./controladores/extrato");

const roteador = express();

roteador.get("/contas", listarContas);
roteador.post("/contas", criarConta);
roteador.put("/contas/:numeroConta/usuario", atualizarUsuarioConta);
roteador.delete("/contas/:numeroConta", excluirConta);
roteador.post("/transacoes/depositar", depositar);
roteador.post("/transacoes/sacar", sacar);
roteador.post("/transacoes/transferir", transferir);
roteador.get("/contas/saldo", saldo);
roteador.get("/contas/extrato", extrato);

module.exports = roteador;