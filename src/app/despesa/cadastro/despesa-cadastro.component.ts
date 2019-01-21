import { Component, OnInit} from '@angular/core';
import { DespesaService } from '../despesa.service';
import { Despesa } from '../despesa';
import { Pessoa } from '../../pessoa/pessoa';
import { PessoaService } from '../../pessoa/pessoa.service';
import { Parcela } from '../../parcela/parcela';
import * as moment from 'moment/moment';
import { ActivatedRoute } from '@angular/router';
import { FinanciamentoBancarioService } from '../../financiamento-bancario/financiamento-bancario.service';
import { FinanciamentoBancario } from '../../financiamento-bancario/financiamento-bancario';

@Component({
    selector: 'app-despesaCadastro',
    templateUrl: './despesa-cadastro.component.html',
    styleUrls: ['../despesa.component.css']
})
export class DespesaCadastroComponent implements OnInit {

    public despesa: Despesa = new Despesa();
    public pessoa: Pessoa = new Pessoa();
    public despesas: Array<Despesa> = new Array<Despesa>();
    public pessoas: Array<Pessoa> = new Array<Pessoa>();
    public pessoaDespesa: Array<Pessoa> = new Array<Pessoa>();
    public maisDevedor: boolean;
    public pagamentoParcelado: boolean = false;
    public parcela: Parcela = new Parcela();
    public parcelas: Array<Parcela> = new Array<Parcela>();
    public financiamentoBancario:  FinanciamentoBancario = new FinanciamentoBancario();
    public financiamentosBancarios: Array<FinanciamentoBancario> = new Array<FinanciamentoBancario>();
    public qtdParcela: number;
    public foraDos30Dias: boolean = false;
    public deQuantosEmQuantosDias: number;
    public dataVencimento: string;
    public pessoaFisicaJuridica:string = 'fisica';

    constructor(
        private _despesaService: DespesaService,
        private _pessoaService: PessoaService,
        private _activeRoute: ActivatedRoute,
        private _financiamento_bancario: FinanciamentoBancarioService
    ) {
        this._despesaService = _despesaService;
        this._pessoaService = _pessoaService;
        this._activeRoute = _activeRoute;
        this._financiamento_bancario = _financiamento_bancario;
    }
 
    /* 
    ====================================================================================================
    =                                        CHAMADAS AO SERVICE                                       =
    ====================================================================================================
    */

    public salvar() {
        // CHECAR SE A DESPESA É FIXA PARA LIMPAR OS CAMPOS DE PARCELA
        if(this.despesa.fixo){
            this.despesaFixaTrue();
        }

        // RESGATAR PESSOA FISICA OU JURIDICA
        this.resgatarPessoaFisicaJuridica(this.pessoaFisicaJuridica);
        this.despesa.parcela = this.parcelas;

        this._despesaService
            .salvar(this.despesa)
            .subscribe(res => {
                console.log("sucesso ", res);
            }, error => {
                console.log("error ", error);
            });
    }

    // BUSCAR UMA DESPESA PELO ID
    public getDespesa(idDespesa: number){
        this._despesaService
            .getDespesa(idDespesa)
            .subscribe(res => {
                this.despesa = res;
            }, error => {
                window.alert(error);
            });
    }
    
    // LISTAR TODAS AS PESSOAS 
    public listarPessoas() {
        this._pessoaService
            .listar()
            .subscribe(res => {
                this.pessoas = res;
            }, error => {
                console.log("ERRO AO BUSCAR PESSOAS");
            });
    }

    // BUSCAR LISTA DE CARTOES/CHEQUES/FINANCIAMENTOS CADASTRADOS
    public listarFinanciamentosBancarios(){
        this._financiamento_bancario
            .listarFinanciamentoBancario()
            .subscribe(res => {
                this.financiamentosBancarios = res;
            }, error => {
                console.log("ERRO AO BUSCAR PESSOAS");
            });

    }
    
    // RESGATAR PARAMAETRO CASO USUÁRIO QUEIRA EDITAR UMA DESPESA
    public checarParametro() {
        let idDespesa: number;
        this._activeRoute
            .params
            .subscribe(params => {
                idDespesa = params["id"];
            });
        if (idDespesa) {
            this._despesaService
            .getDespesa(idDespesa)
            .subscribe(res => {
                this.despesa = res;
                this.checagemEdicao();
                this.qtdParcela = res.parcela.length;
                this.parcelas = res.parcela;
            }, error => {
                window.alert(error);
            });
        }
    }

    /* 
        ====================================================================================================
        =                                       CHAMADAS SOMENTE DO FRONT                                  =
        ====================================================================================================
    */

    // LIMPAR DATA DA DESPESA CASO A DESPESA SEJA PARCELADA
    public limparDataVencimento() {
        this.despesa.dataVencimento = undefined;
    }

    public resgatarPessoaFisicaJuridica(pessoaFisicaJuridica: string){
        if(pessoaFisicaJuridica === 'fisica'){
            // RESGATAR PESSOA PARA SETAR EM DESPESA
            this.pessoas.forEach(p => {
                if (p.idPessoa === parseInt(this.despesa.pessoa.idPessoa.toString(), 32)) {
                    this.despesa.pessoa = p;
                }
            });
        }else if(pessoaFisicaJuridica == 'juridica'){
            // RESGATAR CARTAO/CHEQUE/FINANCIAMENTO PARA SETAR EM DESPESA
            this.financiamentosBancarios.forEach(f =>{
                if(f.idFinanciamentoBancario === parseInt(this.despesa.financiamentoBancario.idFinanciamentoBancario.toString(), 32)){
                    this.despesa.financiamentoBancario = f;
                }
            });
        }
    }

    public checagemEdicao(){
        console.log(this.despesa);
        if(this.despesa.pessoa == null){
            this.despesa.pessoa = undefined;
            this.pessoaFisicaJuridica = 'juridica';
        }else{
            this.despesa.financiamentoBancario = undefined;
            this.pessoaFisicaJuridica = 'fisica';
        }
        
       console.log(this.despesa.parcelado);
    }
    
    // LIMPAR OS CAMPOS DE PARCELAMENTO CASO A DESPESA SEJA FIXA
    public despesaFixaTrue() {
        this.despesa.parcelado = false;
        this.qtdParcela = undefined;
        this.parcela.valorParcela = undefined;
        this.foraDos30Dias = false;
        this.dataVencimento = undefined;
        this.deQuantosEmQuantosDias = undefined;
        this.despesa.parcela = undefined;
    }
    
    public calcularValorParcela(){
        if (this.qtdParcela > 0 && this.despesa.valor > 0) {
            this.parcela.valorParcela = (this.despesa.valor / this.qtdParcela);
        }
    }

    public calcularParcelas() {
        var numeroParcela = 0;
        this.parcelas = new Array<Parcela>();
        for (let i: number = 0; i < this.qtdParcela; i++) {
            
            let p: Parcela = new Parcela();
            p.numeroParcela = numeroParcela + 1;

            if (!this.foraDos30Dias) {
                this.calcularDias(p, 30, i);
            } else {
                this.calcularDias(p, this.deQuantosEmQuantosDias, i);
            }
        }
    }

    public calcularDias(p: Parcela, dias: number, posicao: number) {
        if (this.parcelas.length > 0) {
            p.dataVencimento = moment(this.parcelas[posicao - 1].dataVencimento).add(dias, 'days').toDate();
            p.valorParcela = this.parcela.valorParcela;
            this.parcelas.push(p);
        } else {
            p.dataVencimento = moment(this.dataVencimento).add(dias, 'days').toDate();
            p.valorParcela = this.parcela.valorParcela;
            this.parcelas.push(p);
        }
    }

    // LIMPAR O TIPO DE PESSOA SELECIONADA CASO TROQUE DE JURÍDICA/FISÍCA || FISICA/JURÍDICA
    public checarTipoPessoa(){
        this.despesa.financiamentoBancario = new FinanciamentoBancario();
        this.despesa.pessoa = new Pessoa();
    }
    
    ngOnInit(): void {
        this.checarParametro();
        this.listarPessoas();
        this.listarFinanciamentosBancarios();
    }
}
