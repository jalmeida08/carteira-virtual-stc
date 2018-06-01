import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa';

@Component({
    selector: 'app-pessoa-form',
    templateUrl: './pessoa-form.component.html',
    styleUrls: ['./../pessoa.component.css']
})
export class PessoaFormComponent implements OnInit {

    public pessoa: Pessoa = new Pessoa();

    constructor(private _pessoaService: PessoaService) {
        this._pessoaService = _pessoaService;
    }

    public requisicaoPessoa(): void {
        if (this.pessoa.idPessoa) {
            this.atualizar();
        } else {
            this.salvar();
        }
    }

    private salvar(): void {
        this._pessoaService
            .salvar(this.pessoa)
            .subscribe(res => {
                console.log(res),
                    this.pessoa = new Pessoa();
            }, erro => {
                console.log("erro ", erro);
            });
    };

    private atualizar(): void {
        this._pessoaService
            .atualizar(this.pessoa)
            .subscribe(res => {
                console.log(res)
            }, erro => {
                console.log("erro ", erro);
            });
    }

    ngOnInit(): void { }
}
