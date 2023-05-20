import Estatiscas from "./Estatiscas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json?");
    if (!data)
        return;
    const transacoes = data.map(normalizarTransacao);
    preencherTabela(transacoes);
    preencherEstatisticas(transacoes);
}
function preencherLista(lista, containerId) {
    const containerElement = document.getElementById(containerId);
    if (containerElement) {
        Object.keys(lista).forEach(key => {
            containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
        });
    }
}
function preencherEstatisticas(transacoes) {
    const data = new Estatiscas(transacoes);
    console.log(data);
    preencherLista(data.pagamento, "pagamento");
    preencherLista(data.status, "status");
    const pagamentoElement = document.getElementById("pagamento");
    if (pagamentoElement) {
        Object.keys(data.pagamento).forEach(key => {
            pagamentoElement.innerHTML += `<p>${key}: ${data.pagamento[key]}</p>`;
        });
    }
    const totalElement = document.querySelector("#total span");
    if (totalElement) {
        totalElement.innerText = data.total.toLocaleString('pt-BR', {
            style: "currency",
            currency: "BRL"
        });
    }
}
function preencherTabela(transacoes) {
    const tabela = document.querySelector("#transacoes tbody");
    if (!tabela)
        return;
    transacoes.forEach(transacao => {
        tabela.innerHTML += `
                <tr>
                    <td>${transacao.nome}</td>
                    <td> ${transacao.email}</td>
                    <td>R$ ${transacao.moeda}</td>
                    <td>${transacao.pagamento}</td>
                    <td>${transacao.status}</td>
                </tr>`;
    });
}
handleData();
//# sourceMappingURL=script.js.map