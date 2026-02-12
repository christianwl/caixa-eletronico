import { startMenu } from "./services/caixa-eletronico.js";

const btnIniciar = document.getElementById("btn-iniciar");

btnIniciar.addEventListener("click", function () {
    startMenu();
});
