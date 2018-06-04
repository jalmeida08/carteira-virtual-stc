import { Pessoa } from '../pessoa/pessoa';
export class Pagamento {
    public idPagamento: number;
    public dataPagamento: Date;
    public fixo: boolean;
    public valor: string;
    public statusPagamento: string
    public pessoa: Pessoa;
    public descricao: string;
}