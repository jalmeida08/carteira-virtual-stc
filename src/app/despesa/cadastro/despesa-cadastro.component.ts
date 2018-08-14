import { Component, OnInit, NgZone, ChangeDetectorRef, Input, Output } from '@angular/core';
import { DespesaService } from '../despesa.service';
import { Despesa } from '../despesa';
import { Pessoa } from '../../pessoa/pessoa';
import { PessoaService } from '../../pessoa/pessoa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parcela } from '../../parcela/parcela';
import { EventEmitter } from 'events';
import { DatePipe } from '@angular/common';
import * as moment from 'moment/moment';

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

    public qtdParcela: number;
    public foraDos30Dias: boolean = false;
    public deQuantosEmQuantosDias: number;
    public dataVencimento: string;

    constructor(
        private _despesaService: DespesaService,
        private _pessoaService: PessoaService,
        private chRef: ChangeDetectorRef,
        private _modalService: NgbModal,
        private _datePipe: DatePipe
    ) {
        this._despesaService = _despesaService;
        this._pessoaService = _pessoaService;
        this._datePipe = _datePipe;
    }

    /*     public openLg(content) {
            this._modalService.open(content, { size: 'lg' });
        }
    
        public desabilitarSelectPessoa(valor: boolean) {
            this.maisDevedor = valor;
        } */

    public salvar() {
        this.pessoas.forEach(p => {
            if (p.idPessoa === parseInt(this.despesa.pessoa.idPessoa.toString(), 32)) {
                this.despesa.pessoa = p;
                console.log("P ", p);
            }
        });
        this.despesa.parcela = this.parcelas;
        //console.log(this.despesa.parcela);
        this._despesaService
            .salvar(this.despesa)
            .subscribe(res => {
                console.log("sucesso ", res);
            }, error => {
                console.log("error ", error);
            });
    }

    public listarPessoas() {
        this._pessoaService
            .listar()
            .subscribe(res => {
                this.pessoas = res;
            }, error => {
                console.log("ERRO AO BUSCAR PESSOAS");
            })
    }

    /*     public adicionarPessoa(event) {
            this.pessoas.forEach(p => {
                if (p.idPessoa === parseInt(this.pessoa.idPessoa.toString(), 32)) {
                    this.pessoaDespesa.push(p);
                }
            });
            event.preventDefault();
        } */

    // LIMPAR DATA DA DESPESA CASO A DESPESA SEJA PARCELADA
    public limparDataVencimento() {
        this.despesa.dataVencimento = undefined;
    }

    /*     public removerPessoaDevedora(pessoa: Pessoa) {
            let novaLista = this.pessoaDespesa;
            let indice = novaLista.indexOf(pessoa);
            novaLista.splice(indice, 1);
            this.pessoaDespesa = novaLista;
        } */

    ///
    public calcularValorParcela() {
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
            //this.checarDiasDoMes(p);
        } else {
            p.dataVencimento = moment(this.dataVencimento).add(dias, 'days').toDate();
            p.valorParcela = this.parcela.valorParcela;
            this.parcelas.push(p);
            //this.checarDiasDoMes(p);
        }
    }

    /* public checarDiasDoMes(parcela : Parcela){
        //console.log(new Date(parcela.dataVencimento).getUTCDate());
    } */

    ngOnInit(): void {
        this.listarPessoas();
    }
}
