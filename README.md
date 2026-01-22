# 🏦 Projeto: Caixa Eletrônico

Este projeto simula o funcionamento de um terminal bancário (ATM), permitindo operações financeiras essenciais através de uma interface interativa via navegador.

## 🎓 Sobre o Projeto
Desenvolvido originalmente em **2024** como parte do programa **Proprofissão**, do **Instituto PROA**. 

O foco principal desta atividade foi:
* **Debugging (Correção de Erros):** Recebi um código base que continha erros de lógica e funcionamento, sendo meu papel identificar e "consertar" o sistema.
* **Refatoração:** Implementação de novas funcionalidades e melhoria do fluxo de navegação entre as opções do menu.
* **Lógica de Programação:** Gerenciamento de saldo, validações de entrada (isNaN), condicionais e estruturas de repetição.

## 🛠️ Modernização (2025)
Em **2025**, o projeto passou por uma atualização técnica para melhorar a organização:
* **Separação de Preocupações:** O código JavaScript, que antes residia dentro do arquivo HTML, foi movido para um arquivo externo `app.js`, seguindo as boas práticas de desenvolvimento web.

## 💻 Funcionalidades
O sistema conta com um fluxo de autenticação via senha (3589) e oferece as seguintes opções:
1. **Saldo:** Exibe o valor disponível atualmente na conta.
2. **Extrato:** Mostra as movimentações recentes (incluindo compras fictícias e operações realizadas).
3. **Saque:** Permite a retirada de valores, validando se há saldo suficiente e se o número digitado é válido.
4. **Depósito:** Adiciona valores ao saldo, impedindo entradas negativas ou inválidas.
5. **Transferência:** Realiza o envio de valores para outras contas, com validação de segurança.
6. **Sair:** Encerra a sessão com uma mensagem personalizada de agradecimento.

## 🔑 Regras de Negócio Implementadas
* **Segurança:** Operações financeiras só podem ser acessadas após a validação da senha.
* **Validação de Dados:** O sistema verifica se o usuário digitou números válidos (evitando erros com campos vazios ou letras).
* **Saldo Protegido:** Não é permitido realizar saques ou transferências que excedam o saldo disponível.

## Autor

<div>
  <a href="https://github.com/christianwl">
    <img src="https://contrib.rocks/image?repo=christianwl/caixa-eletronico" alt="Autor do Portfolio"/>
  </a>
</div>