import moedaParaNumero from "./moedaParaNumero.js";

declare global {
    type TransacaoPagamento = "Boleto" | "Cartão de Crédito";
    type TransacaoStatus =
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


    interface Transacao {
        nome: string;
        id: number;
        data: string;
        status: TransacaoStatus;
        email: string;
        moeda: string;
        valor: number | null;
        pagamento: TransacaoPagamento;
        novo: boolean
    }
}


export default function normalizarTransacao(transacao: TransacaoAPI) {
    return {
        nome: transacao.Nome,
        id: transacao.ID,
        data: transacao.Data,
        status: transacao.Data,
        email: transacao.Email,
        moeda: transacao["Valor (R$)"],
        valor: moedaParaNumero(transacao["Valor (R$)"]),
        pagamento: transacao["Forma de pagamento"],
        novo: Boolean(transacao["Cliente Novo"])
    }
}