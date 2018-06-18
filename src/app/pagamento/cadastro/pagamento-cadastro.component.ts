import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../pessoa/pessoa.service';
import { PagamentoService } from '../pagamento.service';
import { Pessoa } from '../../pessoa/pessoa';
import { Pagamento } from '../pagamento';
import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-pagamento-cadastro',
    templateUrl: './pagamento-cadastro.component.html',
    styleUrls: ['./../pagamento.component.css']
})
export class PagamentoCadastroComponent implements OnInit {

    public pessoas: Pessoa[] = new Array<Pessoa>();
    public pagamento: Pagamento = new Pagamento();
    public dataPagamento : string;

    constructor(
        private _pessoaService: PessoaService,
        private _pagamentoService: PagamentoService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _datePipe : DatePipe,
    ) {
        this._pagamentoService = _pagamentoService;
        this._pessoaService = _pessoaService;
        this._activatedRoute = _activatedRoute;
        this._router = _router;
        this._datePipe = _datePipe
    }

    public salvar() {
        this.pagamento.dataPagamento = new Date(this.dataPagamento+' 00:00:00');
        console.log(this.pagamento.pessoa);
        this._pessoaService
            .getPessoa(parseInt(this.pagamento.pessoa.idPessoa.toString(), 32))
            .subscribe(res => {
                this.pagamento.pessoa = res;
                this.salvarPagamento();
            }, erro => {
                console.log("erro ao salvar");
            });
    }

    public salvarPagamento() {
        this._pagamentoService
            .salvar(this.pagamento)
            .subscribe(res => {
                console.log("salvou ", res);
                this.pagamento = new Pagamento();
            }, error => {
                console.log("error ", error);
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
                console.log("erro no listar ", error);
            })
    }

    public buscarPagamento(idPagamento: number): void {
        this._pagamentoService
            .getPagamento(idPagamento)
            .subscribe(res => {
                this.pagamento = res;
                this.dataPagamento = this._datePipe.transform(res.dataPagamento, 'yyyy-MM-dd');
            }, error => {
                console.log("erro ", error);
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
