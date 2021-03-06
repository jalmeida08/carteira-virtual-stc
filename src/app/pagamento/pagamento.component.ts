import { Component, OnInit } from '@angular/core';
import { Pagamento } from './pagamento';
import { PagamentoService } from './pagamento.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { PessoaService } from '../pessoa/pessoa.service';
import { Pessoa } from '../pessoa/pessoa';
import { Mensagem } from '../alerta/mensagem';

@Component({
    selector: 'app-pagamento',
    templateUrl: './pagamento.component.html',
    styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
    public pagamento: Pagamento = new Pagamento();
    public pagamentos: Pagamento[] = new Array<Pagamento>();
    public mensagens: Mensagem[] = new Array<Mensagem>();
    public dataAtual : string = new Date().toString();

    constructor(
        private _pagamentoService: PagamentoService,
        private _modalService: NgbModal,
        private _datePipe: DatePipe,
        private _pessoaService: PessoaService
    ) {
        this._pagamentoService = _pagamentoService;
        this._pessoaService = _pessoaService;
        this.dataAtual = this._datePipe.transform(this.dataAtual, "yyyy-MM-dd");
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

    public listarPagamentos(): void {
        let cont: number = 0;
        this._pagamentoService
            .listarPagamentos()
            .subscribe(res => {
                this.pagamentos = res;
                this.capturarPessoa(res, cont);
            }, error => {
                this.alerta("Erro " + error, "danger", "Erro! ");
            })
    }

    public capturarPessoa(pagamentos: Array<Pagamento>, cont: number) {
        if (cont < pagamentos.length) {
            if (pagamentos[cont].pessoa.nome === undefined) {
                this._pessoaService
                    .getPessoa(parseInt(pagamentos[cont].pessoa.toString(), 32))
                    .subscribe(res => {
                        let pessoa: Pessoa = res;
                        this.pagamentos[cont - 1].pessoa = pessoa;
                        cont++;
                        this.capturarPessoa(pagamentos, cont);
                    }, error => {
                        cont++;
                        this.capturarPessoa(pagamentos, cont);
                    });
            }
            cont++;
            this.capturarPessoa(pagamentos, cont);
        }
    }

    public remover(pagamento: Pagamento) {
        if (confirm("Deseja remover?")) {
            this._pagamentoService
                .remover(pagamento.idPagamento)
                .subscribe(res => {
                    let novaLista = this.pagamentos.slice(0);
                    let indice = novaLista.indexOf(pagamento);
                    novaLista.splice(indice, 1);
                    this.pagamentos = novaLista;
                    this.alerta("Excluido com sucesso", "success", "Sucesso! ");
                }, error => {
                    this.alerta("Erro ao excluir", "danger", "Erro! ");
                });
        }
    }

    public openLg(content, pagamento: Pagamento) {
        this.pagamento = pagamento;
        this._modalService.open(content, { size: 'lg' });
    }

    public fecharPagamento(idPagamento: number) {
        if(confirm("Deseja realmente dar o pagamento como recebido?")){
            this.mensagens = new Array<Mensagem>();
            this._pagamentoService
            .fecharPagamento(idPagamento)
            .subscribe(res => {
                this.alerta("Pagamento recebido com sucesso", "success", "Sucesso! ");
                this.listarPagamentos();
            }, error => {
                this.alerta(
                    "Erro ao fechar o pagamento, verifique se o pagamento já está com o status de 'RECEBIDO'",
                    "danger",
                    "Erro! "
                );
            })
        }
    }

    public abrirPagamento(idPagamento : number){
        if(window.confirm("Deseja realmente abrir o pagamento? ")){
            this.mensagens = new Array<Mensagem>();
            this._pagamentoService
            .abrirPagamento(idPagamento)
            .subscribe(res =>{
                this.alerta("Pagamento aberto com sucesso", "success", "Sucesso! ");
                this.listarPagamentos();
            }, error => {
                this.alerta(
                    "Erro ao abrir o pagamento, verifique se o pagamento já está com o status de 'A RECEBER'",
                    "danger",
                    "Erro! "
                );
            })
        }
    }

    public pagamentosDoMes(){
        this._pagamentoService
            .pagametosDoMes()
            .subscribe(res => {
                this.pagamentos = res
            }, error => {
                this.alerta(
                    "Erro ao abrir o carregar a lista de pagamentos do mês",
                    "danger",
                    "Erro! "
                );
            })
    }
    
    ngOnInit(): void {
        this.pagamentosDoMes();
    }
}
