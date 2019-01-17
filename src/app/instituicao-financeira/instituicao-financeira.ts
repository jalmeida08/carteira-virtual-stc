import { FinanciamentoBancario } from "../financiamento-bancario/financiamento-bancario";

export class InstituicaoFinanceira{

	public  idInstituicaoFinanceira: number;
	public nome: string;
	public financiamentoBancario: Array<FinanciamentoBancario>  = new Array<FinanciamentoBancario>();
}