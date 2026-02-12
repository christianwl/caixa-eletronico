import {
  receberNumeroEspecifico,
  receberString,
  receberValorNumerico,
} from "../utils/functions.js";

let saldo = 100.5; //Float
let textoExtrato = "";
let nomeDoUsuario = "";

function receberUsuario() {
  let nome = receberString("Por favor, digite o seu nome:");
  if (nome != null) {
    alert(`Olá ${nome} é um prazer ter você por aqui!`);
  }
  return nome;
}

export function startMenu() {
  if (nomeDoUsuario == "") nomeDoUsuario = receberUsuario();
  if (nomeDoUsuario == null) {
    alert("Programa encerrado antecipadamente");
    return;
  }

  let textoEscolha = "Seleciona uma opção";
  let listaIndices = [];

  const opcoes = [
    { nome: "Saldo", acao: verSaldo },
    { nome: "Depósito", acao: fazerDeposito },
    { nome: "Saque", acao: fazerSaque },
    { nome: "Extrato", acao: mostrarExtrato },
    { nome: "Transferência", acao: fazerTransferencia },
  ];

  opcoes.forEach((opt, i) => {
    textoEscolha += `\n\n${i + 1}.) ${opt.nome}`;
    listaIndices.push(i + 1);
  });

  textoEscolha += "\n\n0.) Sair";
  listaIndices.push(0);

  let escolha = receberNumeroEspecifico(textoEscolha, listaIndices);
  if (escolha == null) return;
  if (escolha == 0) return sair();

  if (successfulLogin()) {
    opcoes[escolha - 1].acao();
  }
}

function successfulLogin() {
  let correctPassword = 3589;
  let senha = receberValorNumerico(
    "Digite sua senha: \n\nOBS: A senha contém apenas 4 números!",
  );

  if (senha != correctPassword) {
    alert("Senha incorreta\n\nPrograma será encerrado!");
    alert("Dica: Tente ver o console do navegador na próxima tentativa!");
    console.log(`A senha correta é: ${correctPassword}!`);
    return false;
  }

  return true;
}

function verSaldo() {
  alert("Seu saldo atual é: " + saldo);
  startMenu();
}

function fazerDeposito() {
  let deposito = parseFloat(prompt("Qual o valor para depósito?"));
  // Not a Number
  if (isNaN(deposito) || deposito === "") {
    alert("Por favor, informe um número:");
    fazerDeposito();
  } else {
    if (deposito <= 0) {
      naoAutorizado();
      fazerDeposito();
    } else {
      saldo += deposito;
      textoExtrato += "\n\nDeposito: +R$" + deposito.toFixed(2);
      verSaldo();
    }
  }
}

function fazerSaque() {
  if (saldo > 0) {
    let saque = parseFloat(prompt("Qual o valor para saque?"));
    if (isNaN(saque) || saque === "") {
      alert("Por favor, informe um número:");
      fazerSaque();
    } else if (saque > saldo || saque <= 0) {
      naoAutorizado();
      fazerSaque();
    } else {
      saldo -= saque;
      textoExtrato += "\n\nSaque: -R$" + saque.toFixed(2);
      verSaldo();
    }
  } else {
    alert("Seu saldo está em 0, não é possível realizar o saque!");
    startMenu();
  }
}

function mostrarExtrato() {
  apresentar_alert(
    "Bolo de cenoura: -R$20.50\n\nRefrigerante: -R$8.00\n\nRecarga do Celular: -R$25.00" +
      textoExtrato,
  );
  startMenu();
}

function fazerTransferencia(verifica = true) {
  if (saldo > 0) {
    let numeroConta = parseInt(
      prompt("Digite o número da conta para qual você deseja transferir: "),
    );

    if (isNaN(numeroConta) || (numeroConta === "" && verifica)) {
      alert("Por favor, informe um número:");
      fazerTransferencia();
    } else {
      let podeTransferir = false;
      do {
        let valor = Number(prompt("Digite o valor a ser transferido: "));
        if (isNaN(valor) || valor === "") {
          alert("Por favor, informe um número:");
        } else if (valor > saldo || valor <= 0) {
          naoAutorizado();
        } else {
          saldo -= valor;
          textoExtrato += "\n\nTransferência: -R$" + valor.toFixed(2);
          podeTransferir = true;
          verSaldo();
        }
      } while (!podeTransferir);
    }
  } else {
    alert("Seu saldo está em 0, não é possível realizar o saque!");
    startMenu();
  }
}

function naoAutorizado() {
  alert("Operação não autorizada");
}

function sair() {
  let confirma = confirm("Você deseja sair?");
  if (confirma) {
    alert(
      "Obrigado por utilizar os serviços do nosso banco: " +
        nomeDoUsuario +
        ", foi um prazer ter você por aqui.",
    );
    window.close();
  } else {
    startMenu();
  }
}
