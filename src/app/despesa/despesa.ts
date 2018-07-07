import { Pessoa } from "../pessoa/pessoa";

export class Despesa{

    public idDespesa: number;
	public dataVencimento: Date;
	public dataPagamento: Date;
	public valor: string;
	public fixo: boolean;
	public pessoa : Array<Pessoa>;
}