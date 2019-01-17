import { Pagamento } from "../pagamento/pagamento";
import { Despesa } from "../despesa/despesa";

export class Parcela {
    public idParcela: number;
    public pagamento: Pagamento;
    public despesa: Despesa;
    public valorParcela : number;
    public valorPago : number;
    public dataVencimento : Date;
    public dataPagamento : Date;
    public numeroParcela: number;

}