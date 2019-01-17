import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PessoaService } from '../../pessoa/pessoa.service';
import { PagamentoService } from '../pagamento.service';
import { Pessoa } from '../../pessoa/pessoa';
import { Pagamento } from '../pagamento';
import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Mensagem } from '../../alerta/mensagem';
import { Parcela } from '../../parcela/parcela';
import { Plataforma } from '../../util/plataforma.config';
import { CookieService } from 'ngx-cookie-service';

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
    public parcela: Parcela = new Parcela();
    @Output() calcularParcela = new EventEmitter();

    constructor(
        private _pessoaService: PessoaService,
        private _pagamentoService: PagamentoService,
        private _activatedRoute: ActivatedRoute,
        private _cookieService: CookieService,
        private _datePipe: DatePipe,
    ) {
        this._pagamentoService = _pagamentoService;
        this._pessoaService = _pessoaService;
        this._activatedRoute = _activatedRoute;
        this._datePipe = _datePipe;
        this._cookieService = _cookieService;
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
        this._pessoaService
            .getPessoa(parseInt(this.pagamento.pessoa.idPessoa.toString(), 32))
            .subscribe(res => {
                this.pagamento.pessoa = res;
                if (!this.pagamento.idPagamento) {
                    this.salvarPagamento();
                } else {
                    this.atualizar();
                }
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

    public atualizar() {
        this._pagamentoService
            .atualizar(this.pagamento)
            .subscribe(res => {
                this.alerta("Atualizado com sucesso", "success", "Sucesso! ");
                this.pagamento = new Pagamento();
            }, error => {
                this.alerta("Erro ao atualizar", "danger", "Erro! ");
            })

    }

    public pagamentoFixo(): void {
        let dataAtual: Date = new Date();
        if (this.dataPagamento > this._datePipe.transform(dataAtual, 'yyyy-MM-dd')) {
            this.pagamento.statusPagamento = 'ARECEBER';
        } else {
            this.pagamento.statusPagamento = 'RECEBIDO';
        }
    }

    public listarPessoas() {
        this._pessoaService
            .listar()
            .subscribe(res => {
                this.pessoas = res
            }, error => {
                this.alerta("Erro " + error, "danger", "Erro! ");
            });
    }

    public buscarPagamento(idPagamento: number): void {
        this._pagamentoService
            .getPagamento(idPagamento)
            .subscribe(res => {
                this.pagamento = res;
                this.dataPagamento = this._datePipe.transform(res.dataPagamento, 'yyyy-MM-dd');
            }, error => {
                this.alerta("Erro " + error, "danger", "Erro! ");
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
