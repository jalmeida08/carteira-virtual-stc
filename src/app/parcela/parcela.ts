import { Pagamento } from "../pagamento/pagamento";

export class Parcela {
    public idparcela: number;
    public pagamento: Pagamento;
    public valorParcela : number;
    public valorPago : string;
    public dataVencimento : Date;
    public dataPagamento : Date;

}