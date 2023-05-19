import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json");
    if (!data)
        return;
    const transacao = data.map(normalizarTransacao);
    console.log(transacao);
}
handleData();
//# sourceMappingURL=script.js.map