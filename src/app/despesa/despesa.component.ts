import { Component, OnInit } from '@angular/core';
import { Despesa } from './despesa';
import { DespesaService } from './despesa.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Parcela } from '../parcela/parcela';
import { DatePipe } from '@angular/common';
import * as moment from 'moment/moment';
import { ParcelaService } from '../parcela/parcela.service';
import { Mensagem } from '../alerta/mensagem';
import { Plataforma } from '../util/plataforma.config';
import { CookieService } from 'ngx-cookie-service';

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
    public pagarValorTotal: boolean = true;
    public valorASerPago: number;
    public mensagens: Mensagem[] = new Array<Mensagem>();
    public mensagemConfirmacao: object;
    public pagarDespesa: boolean = false;
    public detalharParcela: boolean = false;

    constructor(
        private _despesaService: DespesaService,
        private _modalService: NgbModal,
        private _datePipe: DatePipe,
        private _parcelaService: ParcelaService,
        private _cookieService: CookieService
    ) {
        this._despesaService = _despesaService;
        this._datePipe = _datePipe;
        this._parcelaService = _parcelaService;
        this._cookieService = _cookieService;
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
                this.alerta("Erro ao buscar despesas", "danger", "Erro! ");
            })
    }

    // SALVAR O REGISTRO DO PAGAMENTO DA PARCELA
    public salvarPagamentoParcela(content: any) {
        this.parcela.valorPago = this.valorASerPago;
        this.parcela.dataPagamento = new Date(this.dataPagamento);

        this._parcelaService
            .fecharParcela(this.parcela)
            .subscribe(res => {
                this.alerta("Pagamento efetuado com sucesso", "success", "Sucesso! ");
                this.modalReference.close();
                this.modalDetalharDespesa(content, this.despesa);
            }, error => {
                this.alerta("Erro ao efetuar pagamento", "danger", "Erro! ");
            });
    }

    // RESPONSAVEL POR CHAMAR A MODAL DE CONFIRMACAO
    public modalConfirmacao(parcela: Parcela, content: any, opcao: string) {
        if (opcao == 'abrirPagamento') {
            this.parcela = parcela;
            this.mensagemConfirmacao = {
                titulo: 'Reabertura da parcela ' + parcela.numeroParcela + '/' + this.despesa.parcela.length,
                texto: 'Deseja realmente declarar está parcela como ainda não paga?'
            }

        }
        this.modalReference.close();
        this.modalReference = this._modalService.open(content, { size: 'lg' });
    }

    // ABRIR O REGISTRO DE PAGAMENTO DA PARCELA
    public abrirPagamentoParcela(content: any) {
        this._parcelaService
            .abrirParcela(this.parcela)
            .subscribe(res => {
                this.alerta("Pagamento reaberto com sucesso", "success", "Sucesso! ");
                this.getDespesa(this.despesa.idDespesa);
                this.modalReference.close();
                this.modalDetalharDespesa(content, this.despesa);
            }, error => {
                this.alerta("Erro ao abrir pagamento", "danger", "Erro! ");
            });
    }

    // BUSCAR UMA UNICA DESPESA NO BANCO DE DADOS
    public getDespesa(idDespesa: number) {
        this._despesaService
            .getDespesa(idDespesa)
            .subscribe(res => {
                this.despesa = res;
            }, error => {
                this.alerta("Erro ao Salvar", "danger", "Erro! ");
            });
    }

    // MODAL RESPONSÁVEL POR ABRIR AS PARCELAS DA DESPESA
    public modalDetalharDespesa(content, despesa: Despesa) {
        this.pagarParcela = false;
        if (this.despesa.idDespesa != despesa.idDespesa) {
            this.getDespesa(despesa.idDespesa)
        }
        this.totalParcelas = despesa.parcela.length;
        this.modalReference = this._modalService.open(content, { size: 'lg' });
    }

    // MODAL RESPONSÁVEL POR ABRIR A PARCELA
    public modalDetalheParcela(content: any, parcela: Parcela, acao: string) {
        this.modalReference.close();
        if (parcela != undefined) {
            this.parcela = parcela;
        }

        if (acao == 'detalhar') {
            this.detalharParcela = true;
        } else {
            this.detalharParcela = false;
        }
        this.modalReference = this._modalService.open(content, { size: 'lg' });
    }

    // RESPONSÁVEL POR CHAMAR FUNÇÕES PARA SERTAR VALOR TOTAL E DATA ATUAL
    public pagarParcelaFunc() {
        this.pagarValorTotal = true;
        this.pagamentoDiaAtual = true;

        this.pagarHoje();
        this.pagarValorTotalFunction();
    }

    // RESPONSAVEL POR SETAR DATA ATUAL
    public pagarHoje() {
        if (this.pagamentoDiaAtual)
            this.dataPagamento = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
        else
            this.dataPagamento = undefined;
    }

    // RESPONSÁVEL POR SETAR VALOR TOTAL DA PARCELA
    public pagarValorTotalFunction() {
        if (this.pagarValorTotal)
            this.valorASerPago = this.parcela.valorParcela;
        else
            this.valorASerPago = undefined;
    }

    public pagarDespesaMes() {
        this.pagarValorTotal = true;
        this.pagamentoDiaAtual = true;
        this.pagarHoje();

        if (this.pagarParcela)
            this.pagarParcela = false
        else
            this.pagarParcela = true;
    }

    public pagarDespesaSelecionada(){
        let data =  this.dataPagamento.split('-');
        this._despesaService
            .pagarDespesa(this.despesa.idDespesa, this.dataPagamento)
            .subscribe((res:Response)=>
                this.alerta("Pagamento reaberto com sucesso", "success", "Sucesso! ")
            ,(error: Response)=>
                console.log('error -> ', error)                
            );
    }
    
    ngOnInit() {
        this.listarDespesas();
    }

}
