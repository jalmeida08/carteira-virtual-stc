import { InstituicaoFinanceira } from "../instituicao-financeira/instituicao-financeira";
import { Despesa } from "../despesa/despesa";

export class FinanciamentoBancario{

    public idFinanciamentoBancario: number;
	public numero: number;
	public dataVecimento: Date;
	public bandeira: string;
	public instituicaoFinanceira: InstituicaoFinanceira;
	public despesa: Array<Despesa> = new Array<Despesa>();
}