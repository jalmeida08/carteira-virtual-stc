import { Component, OnInit, NgZone, ChangeDetectorRef, Input, Output } from '@angular/core';
import { DespesaService } from '../despesa.service';
import { Despesa } from '../despesa';
import { Pessoa } from '../../pessoa/pessoa';
import { PessoaService } from '../../pessoa/pessoa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parcela } from '../../parcela/parcela';
import { EventEmitter } from 'events';

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
    @Input() public pagamentoParcelado: boolean = false;
    public parcela: Parcela = new Parcela();
    @Output() public parcelas = new EventEmitter(); 

    constructor(
        private _despesaService: DespesaService,
        private _pessoaService: PessoaService,
        private chRef: ChangeDetectorRef,
        private _modalService: NgbModal,
    ) {
        this._despesaService = _despesaService;
        this._pessoaService = _pessoaService;
    }

    public openLg(content) {
        this._modalService.open(content, { size: 'lg' });
    }

    public desabilitarSelectPessoa(valor: boolean) {
        this.maisDevedor = valor;
    }

    public salvar() {
        this.pessoas.forEach(p => {
            if (p.idPessoa === parseInt(this.despesa.pessoa.idPessoa.toString(), 32)) {
                this.despesa.pessoa = p;
                console.log("P ", p);
            }
        });
        console.log(this.parcelas);
        //console.log(this.despesa.parcela);
        /* this._despesaService
            .salvar(this.despesa)
            .subscribe(res => {
                console.log("sucesso ", res);
            }, error => {
                console.log("error ", error);
            }); */
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

    public adicionarPessoa(event) {
        this.pessoas.forEach(p => {
            if (p.idPessoa === parseInt(this.pessoa.idPessoa.toString(), 32)) {
                this.pessoaDespesa.push(p);
            }
        });
        event.preventDefault();
    }

    public removerPessoaDevedora(pessoa: Pessoa) {
        let novaLista = this.pessoaDespesa;
        let indice = novaLista.indexOf(pessoa);
        novaLista.splice(indice, 1);
        this.pessoaDespesa = novaLista;
    }

    ngOnInit(): void {
        this.listarPessoas();
    }
}
