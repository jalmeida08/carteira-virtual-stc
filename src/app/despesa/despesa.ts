import { Pessoa } from "../pessoa/pessoa";
import { Parcela } from "../parcela/parcela";
import { FinanciamentoBancario } from "../financiamento-bancario/financiamento-bancario";
import { Usuario } from "../usuario/usuario";

export class Despesa{

    public idDespesa: number;
	public dataVencimento: Date;
	public dataPagamento: Date;
	public valor: number;
	public statusDespesa : string;
	public fixo: boolean = false;
	public descricao: string;
	public pessoa : Pessoa = new Pessoa();
	public parcelado: boolean = false;
	public parcela: Array<Parcela> = new Array<Parcela>();
	public financiamentoBancario: FinanciamentoBancario = new FinanciamentoBancario();
	public usuario: Usuario = new Usuario();
}