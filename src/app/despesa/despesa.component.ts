import { Component, OnInit } from '@angular/core';
import { Despesa } from './despesa';
import { DespesaService } from './despesa.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Parcela } from '../parcela/parcela';
import { DatePipe } from '@angular/common';
import * as moment from 'moment/moment';
import { ParcelaService } from '../parcela/parcela.service';
import { Mensagem } from '../alerta/mensagem';

@Component({
    selector: 'app-despesa',
    templateUrl: './despesa.component.html',
    styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit {

    public despesas: Array<Despesa> = new Array<Despesa>();
    public despesa: Despesa = new Despesa();
    public parcela: Parcela = new Parcela();
    public totalParcelas: number = 0;
    public closeResult: string;
    public modalReference: NgbModalRef;
    public pagarParcela: boolean = false;
    public pagamentoDiaAtual: boolean = true;
    public dataPagamento: string;
    public pagarValorTotal: boolean = true ;
    public valorASerPago: number;
    public mensagens: Mensagem[] = new Array<Mensagem>();

    constructor(
        private _despesaService: DespesaService,
        private _modalService: NgbModal,
        private _datePipe: DatePipe,
        private _parcelaService: ParcelaService
    ) {
        this._despesaService = _despesaService;
        this._datePipe = _datePipe;
        this._parcelaService = _parcelaService;
    }

    // RESPONSAVEL POR DISPARAR AS MENSAGENS NA TELA
    public alerta(
        mensagem: string,
        tipoMensagem: string,
        mensagemDesaque: string) {
        this.mensagens.push(
            {
                mensagem: mensagem,
                tipoMensagem: tipoMensagem,
                mensagemDesaque: mensagemDesaque
            }
        );
    }

    // BUSCAR TODAS OS PAGAMENTOS E SUAS PARCELAS
    public listarDespesas() {
        this._despesaService
            .listarDespesas()
            .subscribe(res => {
                this.despesas = res;
            }, error => {
                this.alerta("Erro ao Salvar", "danger", "Erro! ");
            })
    }
    
    // SALVAR O REGISTRO DO PAGAMENTO DA PARCELA
    public salvarPagamentoParcela(){
        this.parcela.valorPago = this.valorASerPago;
        this.parcela.dataPagamento = new Date(this.dataPagamento);

        this._parcelaService
            .fecharParcela(this.parcela)
            .subscribe(res =>{
                this.alerta("Pagamento efetuado com sucesso", "success", "Sucesso! ");
                this.modalReference.close();
            }, error=> {
                this.alerta("Erro ao efetuar pagamento", "danger", "Erro! ");
            });
    } 

    // ABRIR O REGISTRO DE PAGAMENTO DA PARCELA
    public abrirPagamentoParcela(parcela: Parcela){
        this._parcelaService
            .abrirParcela(parcela)
            .subscribe(res => {
                this.alerta("Pagamento reaberto com sucesso", "success", "Sucesso! ");
                this.modalReference.close();
                this.openLg('content', this.despesa);
            }, error => {
                this.alerta("Erro ao abrir pagamento", "danger", "Erro! ");
            });
    }

    // BUSCAR UMA UNICA DESPESA NO BANCO DE DADOS
    public getDespesa(idDespesa: number){
        this._despesaService
            .getDespesa(idDespesa)
            .subscribe(res =>{
                this.despesa = res;
            }, error => {
                this.alerta("Erro ao Salvar", "danger", "Erro! ");
            });
    }
    
    // MODAL RESPONSÁVEL POR ABRIR AS PARCELAS DA DESPESA
    public openLg(content, despesa:Despesa) {
        this.pagarParcela = false;
        this.despesa = despesa;
        this.totalParcelas = despesa.parcela.length;
        this.modalReference = this._modalService.open(content, { size: 'lg' });
    }
    
    // MODAL RESPONSÁVEL POR ABRIR A PARCELA
    public openDetalheParcela(detalheParcela, parcela: Parcela) {
        this.modalReference.close();
        this.parcela = parcela;
        this.modalReference = this._modalService.open(detalheParcela, { size: 'lg' });
    }

    // RESPONSÁVEL POR CHAMAR FUNÇÕES PARA SERTAR VALOR TOTAL E DATA ATUAL
    public pagarParcelaFunc(){
        this.pagarValorTotal = true
        this.pagamentoDiaAtual = true

        this.pagarHoje();
        this.pagarValorTotalFunction();
    }
    
    // RESPONSAVEL POR SETAR DATA ATUAL
    public pagarHoje(){
        if(this.pagamentoDiaAtual){
            this.dataPagamento = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
        }else{
            this.dataPagamento = undefined;
        }
    }

    // RESPONSÁVEL POR SETAR VALOR TOTAL DA PARCELA
    public pagarValorTotalFunction(){
        if(this.pagarValorTotal){
            this.valorASerPago = this.parcela.valorParcela;
        }else{
            this.valorASerPago = undefined;
        }
    }

    ngOnInit() {
        this.listarDespesas();
    }

}
