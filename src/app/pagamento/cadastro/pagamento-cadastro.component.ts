import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../pessoa/pessoa.service';
import { PagamentoService } from '../pagamento.service';
import { Pessoa } from '../../pessoa/pessoa';
import { Pagamento } from '../pagamento';
import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Mensagem } from '../../alerta/mensagem';
import { Parcela } from '../../parcela/parcela';

@Component({
    selector: 'app-pagamento-cadastro',
    templateUrl: './pagamento-cadastro.component.html',
    styleUrls: ['./../pagamento.component.css']
})
export class PagamentoCadastroComponent implements OnInit {

    public pessoas: Pessoa[] = new Array<Pessoa>();
    public pagamento: Pagamento = new Pagamento();
    public dataPagamento: string;
    public pagamentoParcelado: boolean = false;
    public mensagens: Mensagem[] = new Array<Mensagem>();
    public parcela : Parcela = new Parcela();

    constructor(
        private _pessoaService: PessoaService,
        private _pagamentoService: PagamentoService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _datePipe: DatePipe,
    ) {
        this._pagamentoService = _pagamentoService;
        this._pessoaService = _pessoaService;
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._datePipe = _datePipe
    }

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

    public salvar() {
        this.pagamento.dataPagamento = new Date(this.dataPagamento + ' 00:00:00');
        console.log(this.pagamento.pessoa);
        this._pessoaService
            .getPessoa(parseInt(this.pagamento.pessoa.idPessoa.toString(), 32))
            .subscribe(res => {
                this.pagamento.pessoa = res;
                this.salvarPagamento();
            }, error => {
                this.alerta("Erro ao Salvar", "danger", "Erro! ");

            });
    }

    public salvarPagamento() {
        this._pagamentoService
            .salvar(this.pagamento)
            .subscribe(res => {
                this.alerta("Salvo com sucesso", "success", "Sucesso! ");                
                this.pagamento = new Pagamento();
            }, error => {
                this.alerta("Erro ao salvar", "danger", "Erro! ");
            });
    }

    public pagamentoFixo(): void {
        this.pagamento.statusPagamento = undefined;
    }

    public listarPessoas() {
        this._pessoaService
            .listar()
            .subscribe(res => {
                this.pessoas = res
            }, error => {
                this.alerta("Erro "+error, "danger", "Erro! ");
            });
    }

    public buscarPagamento(idPagamento: number): void {
        this._pagamentoService
            .getPagamento(idPagamento)
            .subscribe(res => {
                this.pagamento = res;
                this.dataPagamento = this._datePipe.transform(res.dataPagamento, 'yyyy-MM-dd');
            }, error => {
                this.alerta("Erro "+error, "danger", "Erro! ");
            })
    }

    public checarParametro(): void {
        let idPagamento: number;
        this._activatedRoute.params.subscribe(params => {
            idPagamento = params["id"];
        });
        if (idPagamento) {
            this.buscarPagamento(idPagamento);
        }
    }

    ngOnInit(): void {
        this.checarParametro();
        this.listarPessoas();
    }
}
