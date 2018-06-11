import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../pessoa/pessoa.service';
import { PagamentoService } from '../pagamento.service';
import { Pessoa } from '../../pessoa/pessoa';
import { Pagamento } from '../pagamento';
import * as moment from 'moment/moment';

@Component({
    selector: 'app-pagamento-cadastro',
    templateUrl: './pagamento-cadastro.component.html',
    styleUrls: ['./../pagamento.component.css']
})
export class PagamentoCadastroComponent implements OnInit {

    public pessoas: Pessoa[] = new Array<Pessoa>();
    public pagamento: Pagamento = new Pagamento();

    constructor(
        private _pessoaService: PessoaService,
        private _pagamentoService: PagamentoService
    ) {
        this._pagamentoService = _pagamentoService;
        this._pessoaService = _pessoaService;
    }

    public salvar() {
        this._pessoaService
            .getPessoa(parseInt(this.pagamento.pessoa.toString(), 32))
            .subscribe(res => {
                this.pagamento.pessoa = res;
                console.log(this.pagamento);
                this.salvarPagamento();
            }, erro => {
                console.log("erro ao salvar");
            });
    }

    public salvarPagamento() {
        this._pagamentoService
            .salvar(this.pagamento)
            .subscribe(res => {
                console.log("salvou");
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

    ngOnInit(): void {
        let oday : string = moment().format('D MMM YYYY');
        console.log(oday);
        console.log("data");
        this.listarPessoas();
    }
}
