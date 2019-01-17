import { Pessoa } from '../pessoa/pessoa';
import { Usuario } from '../usuario/usuario';

export class Pagamento {
    public idPagamento: number;
    public dataPagamento: Date = new Date();
    public fixo: boolean;
    public valor: number;
    public statusPagamento: string = undefined;
    public pessoa: Pessoa = new Pessoa();
    public descricao: string;
    //public Parcela: Parcela[] = new Array<Parcela>();
    public usuario: Usuario = new Usuario();
}