import { receberUsuario, startMenu } from "./services/caixa-eletronico.js";

const btnIniciar = document.getElementById("btn-iniciar");

btnIniciar.addEventListener("click", function () {
  let nome = receberUsuario();
  if (nome != null) {
    startMenu(nome);
  } else {
    alert("Programa encerrado antecipadamente");
  }
});
