import { Pessoa } from '../pessoa/pessoa';
export class Pagamento {
    public idPagamento: number;
    public dataPagamento: Date = new Date();
    public fixo: boolean;
    public valor: string;
    public statusPagamento: string = undefined;
    public pessoa: Pessoa = new Pessoa();
    public descricao: string;
}