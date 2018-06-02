import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-pessoa-form',
    templateUrl: './pessoa-form.component.html',
    styleUrls: ['./../pessoa.component.css']
})
export class PessoaFormComponent implements OnInit {

    public pessoa: Pessoa = new Pessoa();

    constructor(
        private _pessoaService: PessoaService,
        private _activeRoute: ActivatedRoute,
        private _router: Router
    ) {
        this._pessoaService = _pessoaService;
        this._activeRoute = _activeRoute;
        this._router = _router;
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

    public buscarPessoa(idPessoa: number): void {
        this._pessoaService
            .getPessoa(idPessoa)
            .subscribe(res => {
                this.pessoa = res;
                console.log(this.pessoa);
            }, error => {
                console.log("erro ", error);
            })
    }

    public checarParametro() {
        let idPessoa: number;
        this._activeRoute.params.subscribe(params => {
            idPessoa = params["id"];
        });
        if (idPessoa) {
            this.buscarPessoa(idPessoa);
        }
    }

    ngOnInit(): void {
        this.checarParametro();
    }
}
