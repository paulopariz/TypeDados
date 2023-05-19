import fetchData from "./fetchData.js";


type TransacaoPagamento = "Boleto" | "Cartão de Crédito";
type TransacaoStatud =
    | "Paga"
    | "Recusada pela operadora de catão"
    | "Aguardando pagamento"
    | "Estornada";

interface TransacaoAPI {
    Nome: string;
    ID: number;
    Data: string;
    Status: string;
    Email: string;
    ['Valor (R$)']: string;
    ['Forma de pagamento']: TransacaoPagamento;
    ['Cliente Novo']: number;

}

async function handleData() {

    const data = await fetchData<TransacaoAPI[]>("https://api.origamid.dev/json/transacoes.json");

    if (data) {
        data.forEach((item) => {
            console.log(item["Valor (R$)"])
        });
    }

    console.log("codigo continuou")
}


handleData()