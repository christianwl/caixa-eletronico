var saldo = 100.5; //Float
		var textoExtrato = '';
		var nomeDoUsuario = prompt("Por favor, digite o seu nome: ");

		function ReceberUsuario() {
			alert(`Olá ${nomeDoUsuario} é um prazer ter você por aqui!`);
		}

		ReceberUsuario(nomeDoUsuario);

		function inicio() {

			var escolha = parseInt(prompt('Selecione uma opção \n\n1.) Saldo \n\n2.) Extrato \n\n3.) Saque \n\n4.) Depósito \n\n5.) Transferência \n\n6.) Sair'));
			var podeRealizarOperacao = false;


			if (escolha != 6) {
				var senha = prompt("Digite sua senha: ");
				if (senha != 3589) {
					alert("Senha incorreta")
				} else {
					podeRealizarOperacao = true;
				}
			} else {
				podeRealizarOperacao = true;
			}


			if (podeRealizarOperacao) {
				switch (escolha) {
					case 1:
						ver_saldo();
						break;
					case 2:
						fazer_deposito();
						break;
					case 3:
						fazer_saque();
						break;
					case 4:
						mostrar_extrato()
						break;
					case 5:
						fazer_transferencia(true);
						break;
					case 6:
						sair();
						break;
					default:
						erro();
				}
			}

		}

		function ver_saldo() {
			alert('Seu saldo atual é: ' + saldo);
			inicio();
		}

		function fazer_deposito() {
			var deposito = parseFloat(prompt('Qual o valor para depósito?'));
			// Not a Number
			if (isNaN(deposito) || deposito === '') {
				alert('Por favor, informe um número:');
				fazer_deposito();
			} else {
				if (deposito <= 0) {
					nao_autorizado();
					fazer_deposito();
				} else {
					saldo += deposito;
					textoExtrato += '\n\nDeposito: +R$' + deposito.toFixed(2);
					ver_saldo();
				}

			}
		}

		function fazer_saque() {
			if (saldo > 0) {
				var saque = parseFloat(prompt('Qual o valor para saque?'));
				if (isNaN(saque) || saque === '') {
					alert('Por favor, informe um número:');
					fazer_saque();
				} else if (saque > saldo || saque <= 0) {
					nao_autorizado();
					fazer_saque();
				} else {
					saldo -= saque;
					textoExtrato += '\n\nSaque: -R$' + saque.toFixed(2);
					ver_saldo();
				}
			} else {
				alert("Seu saldo está em 0, não é possível realizar o saque!");
				inicio();
			}
		}

		function mostrar_extrato() {
			apresentar_alert("Bolo de cenoura: -R$20.50\n\nRefrigerante: -R$8.00\n\nRecarga do Celular: -R$25.00" + textoExtrato);
			inicio();
		}

		function fazer_transferencia(verifica) {
			if (saldo > 0) {
				var numeroConta = parseInt(prompt("Digite o número da conta para qual você deseja transferir: "));

				if (isNaN(numeroConta) || numeroConta === '' && verifica) {
					alert('Por favor, informe um número:');
					fazer_transferencia();
				} else {
					var podeTransferir = false;
					do {
						var valor = Number(prompt("Digite o valor a ser transferido: "))
						if (isNaN(valor) || valor === '') {
							alert('Por favor, informe um número:');
						} else if (valor > saldo || valor <= 0) {
							nao_autorizado();
						} else {
							saldo -= valor;
							textoExtrato += '\n\nTransferência: -R$' + valor.toFixed(2);
							podeTransferir = true;
							ver_saldo();
						}
					} while (!podeTransferir);
				}
			} else {
				alert("Seu saldo está em 0, não é possível realizar o saque!");
				inicio();
			}

		}

		function erro(escolha) {
			alert('Por favor, informe um número entre 1 e 6');
			inicio();
		}

		function nao_autorizado() {
			alert("Operação não autorizada");
		}

		function sair() {
			var confirma = confirm('Você deseja sair?');
			if (confirma) {
				alert("Obrigado por utilizar os serviços do nosso banco: " + nomeDoUsuario + ", foi um prazer ter você por aqui.")
				window.close();
			} else {
				inicio();
			}
		}

		inicio();