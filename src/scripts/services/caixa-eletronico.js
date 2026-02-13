import {
  receberNumeroEspecifico,
  receberString,
  receberValorNumerico,
  receberValorPositivo,
} from "../utils/functions.js";

// Saldo da conta
let balance = 100.5;

let statementText = "===Extrato===";
let userName = "";

const ERRORS = {
  UNAUTHORIZED: "Operação não autorizada.",
};

const DEFAULT_STATEMENT = [
  { type: "Bolo de cenora", value: 20.5, isPositive: false },
  { type: "Refrigerante", value: 8.0, isPositive: false },
  { type: "Recarga de Celular", value: 25.0, isPositive: false },
];

DEFAULT_STATEMENT.forEach((transaction) => addStatement(transaction));

/**
 * Adiciona uma transação formatada ao histórico do extrato.
 * * @param {Object} transaction - Objeto que descreve a transação
 * @param {string} transaction.type - O nome da transação (Ex: 'Saque', 'Depósito', 'Transferência')
 * @param {number} transaction.value - O valor monetário da operação
 * @param {boolean} [transaction.isPositive=true] - Define se a operação soma (+) ou subtrai (-) do saldo
 */
function addStatement({ type, value, isPositive = true }) {
  const symbol = isPositive ? "+" : "-";
  statementText += `\n\n${type}: \n${symbol}R$${value.toFixed(2)}\n---------------------`;
}

function requestUserName() {
  let name = receberString("Por favor, digite o seu nome:");
  if (name != null) {
    alert(`Olá ${name} é um prazer ter você por aqui!`);
  }
  return name;
}

export function start() {
  userName = requestUserName();
  if (userName == null) {
    alert("Programa encerrado antecipadamente");
    return;
  }
  startMenu();
}

function startMenu() {
  let choiceText = "Seleciona uma opção";
  let indexList = [];

  const options = [
    { name: "Saldo", action: getBalance },
    { name: "Depósito", action: makeDeposit },
    { name: "Saque", action: withdraw },
    { name: "Extrato", action: viewStatement },
    { name: "Transferência", action: transfer },
  ];

  options.forEach((opt, i) => {
    choiceText += `\n\n${i + 1}.) ${opt.name}`;
    indexList.push(i + 1);
  });

  choiceText += "\n\n0.) Sair";
  indexList.push(0);

  let choice = receberNumeroEspecifico(choiceText, indexList);
  if (choice == null) return;
  if (choice == 0) return exit();

  if (successfulLogin()) {
    options[choice - 1].action();
  }
}

function successfulLogin() {
  const CORRECT_PASSWORD = 3589;
  let userPassword = receberValorNumerico(
    "Digite sua senha: \n\nOBS: A senha contém apenas 4 números!",
  );

  if (userPassword != CORRECT_PASSWORD) {
    alert("Senha incorreta\n\nPrograma será encerrado!");
    alert("Dica: Tente ver o console do navegador na próxima tentativa!");
    console.log(`A senha correta é: ${CORRECT_PASSWORD}!`);
    return false;
  }

  return true;
}

function getBalance() {
  alert("Seu saldo atual é: " + balance);
  startMenu();
}

function makeDeposit() {
  let deposit = receberValorPositivo(
    "Qual o valor para depósito?",
    ERRORS.UNAUTHORIZED,
  );

  if (deposit === null) return startMenu();

  balance += deposit;
  addStatement({ type: "Depósito", value: deposit, isPositive: true });
  getBalance();
}

function getAllowableValue(textPrompt) {
  let value = 0.0;
  let unacceptableValue = false;
  do {
    value = receberValorPositivo(textPrompt, ERRORS.UNAUTHORIZED);

    if (value === null) return null;

    unacceptableValue = value > balance;

    if (unacceptableValue) {
      alert("Saldo insuficiente!\nTente novamente");
    }
  } while (unacceptableValue);

  return value;
}

function withdraw() {
  if (balance <= 0) {
    alert("Seu saldo está em R$0, não é possível realizar o saque!");
    return startMenu();
  } else {
    let withdrawValue = getAllowableValue("Qual o valor para saque?");
    if (withdrawValue === null) return startMenu();

    balance -= withdrawValue;
    addStatement({ type: "Saque", value: withdrawValue, isPositive: false });
    getBalance();
  }
}

function viewStatement() {
  alert(statementText);
  startMenu();
}

function transfer() {
  if (balance <= 0) {
    alert("Seu saldo está em R$0, não é possível realizar a transferência!");
    return startMenu();
  } else {
    let accountNumber = receberValorNumerico(
      "Digite o número da conta para qual você deseja transferir: ",
    );
    if (accountNumber === null) return startMenu();

    let transferValue = getAllowableValue("Digite o valor a ser transferido: ");
    if (transferValue === null) return startMenu();

    balance -= transferValue;
    addStatement({
      type: `Transferência para conta ${accountNumber}`,
      value: transferValue,
      isPositive: false,
    });
    getBalance();
  }
}

function exit() {
  let isConfirm = confirm("Você deseja sair?");
  if (isConfirm) {
    alert(
      "Obrigado por utilizar os serviços do nosso banco: " +
        userName +
        "\nFoi um prazer ter você por aqui.",
    );
    // window.close();
  } else {
    startMenu();
  }
}
