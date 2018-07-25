import { Pessoa } from "../pessoa/pessoa";
import { Parcela } from "../parcela/parcela";

export class Despesa{

    public idDespesa: number;
	public dataVencimento: Date;
	public dataPagamento: Date;
	public valor: number;
	public statusDespesa : string;
	public fixo: boolean = false;
	public descricao: string;
	public pessoa : Pessoa = new Pessoa();
	public parcela: Array<Parcela> = new Array<Parcela>();
}