import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { DespesaService } from '../despesa.service';
import { Despesa } from '../despesa';
import { Pessoa } from '../../pessoa/pessoa';
import { PessoaService } from '../../pessoa/pessoa.service';

@Component({
    selector: 'app-despesaCadastro',
    templateUrl: './despesa-cadastro.component.html',
    styleUrls: ['../despesa.component.css']
})
export class DespesaCadastroComponent implements OnInit {
    
    public despesa : Despesa = new Despesa();
    public pessoa : Pessoa = new Pessoa();
    public despesas: Array<Despesa> = new Array<Despesa>();
    public pessoas: Array<Pessoa> = new Array<Pessoa>();
    public pessoaDespesa : Array<Pessoa> = new Array<Pessoa>();
    public maisDevedor : boolean;

    constructor( 
        private _despesaService : DespesaService,
        private _pessoaService: PessoaService,
        private chRef: ChangeDetectorRef,
    ) {
        this._despesaService = _despesaService;
        this._pessoaService = _pessoaService
    }

    public salvar(){
        this.despesa.pessoa = this.pessoaDespesa;
        console.log(this.despesa);
    }

    public listarPessoas(){
        this._pessoaService
            .listar()
            .subscribe(res => {
                this.pessoas = res;
            }, error => {
                console.log("ERRO AO BUSCAR PESSOAS");
            })
    }

    public adicionarPessoa(event){
        this.pessoas.forEach(p =>{
            if(p.idPessoa === parseInt(this.pessoa.toString(), 32)){
                this.pessoaDespesa.push(p);
            }
        });
        console.log(this.pessoaDespesa);
        event.preventDefault();
    }

    ngOnInit(): void {
        this.listarPessoas();
    }
}
