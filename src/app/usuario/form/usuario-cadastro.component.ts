import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../pessoa/pessoa.service';
import { UsuarioService } from '../usuario.service';
import { Pessoa } from '../../pessoa/pessoa';
import { Usuario } from '../usuario';
import { Mensagem } from '../mensagem';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Component({
    selector: 'app-usuario-cadastro',
    templateUrl: './usuario-cadastro.component.html',
    styleUrls: ['./../usuario.component.css']
})
export class UsuarioCadastroComponent implements OnInit {
    public usuario: Usuario = new Usuario();
    public pessoa: Pessoa = new Pessoa();
    public confirmarSenha: string;
    public senhasDiferentes: boolean = false;
    public mensagens: Mensagem[] = new Array<Mensagem>();

    constructor(
        private _usuarioService: UsuarioService,
        private _pessoaService: PessoaService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {
        this._usuarioService = _usuarioService;
        this._pessoaService = _pessoaService;
        this._activatedRoute = _activatedRoute;
        this._router = _router;
    }

    ngOnInit(): void {
        this.checarParamentro();
    }

    public checarParamentro() {
        let idUsuario: number;
        this._activatedRoute
            .params
            .subscribe(params => {
                idUsuario = params['id'];
            });
        if (idUsuario) {
            this.buscarUsuario(idUsuario);
        }
    }

    public salvar(): void {
        this.salvarPessoa();
    }

    public closeAlert(alert: Mensagem) {
        const index: number = this.mensagens.indexOf(alert);
        this.mensagens.splice(index, 1);
    }

    private salvarPessoa() {
        console.log("salvando pessoa");
        this._pessoaService
            .salvar(this.pessoa)
            .subscribe(res => {
                this.buscarPessoaNomeDtNascimento();
            }, error => {
                this.mensagens.push({
                    mensagem: "Erro ao salvar pessoa " + error,
                    mensagemDesaque: "Erro!",
                    tipoMensagem: "danger"
                });
            });
    }

    private buscarPessoaNomeDtNascimento() {
        console.log("buscarPessoaNomeDtNascimento");
        this._pessoaService
            .buscarNomeDtNascimento(this.pessoa)
            .subscribe(res => {
                this.pessoa = res;
                this.salvarUsuario(this.pessoa);
            }, error => {
                this.mensagens.push({
                    mensagem: "Erro ao salvar pessoa " + error,
                    mensagemDesaque: "Erro!",
                    tipoMensagem: "danger"
                });
            });
    }

    private salvarUsuario(pessoa: Pessoa) {
        this.usuario.pessoa = pessoa;
        this._usuarioService
            .salvar(this.usuario)
            .subscribe(res => {
                this.mensagens.push({
                    mensagem: "Usuário salvo com sucesso",
                    mensagemDesaque: "Sucesso!",
                    tipoMensagem: "success"
                });
                this.pessoa = new Pessoa();
                this.usuario = new Usuario();
                this.confirmarSenha = undefined;
            }, error => {
                this.mensagens.push({
                    mensagem: "Erro ao salvar usuário " + error,
                    mensagemDesaque: "Erro!",
                    tipoMensagem: "danger"
                });
            });
    }

    public checarSenha() {
        if (this.usuario.senha === this.confirmarSenha) {
            this.senhasDiferentes = false;
        } else {
            this.senhasDiferentes = true
        }
    }

    public buscarUsuario(idUsuario: number) {
        this._usuarioService
            .getUsuario(idUsuario)
            .subscribe(res => {
                this.usuario.email = res.email;
                this.usuario.idUsuario = res.idUsuario;
                this.pessoa = res.pessoa;
            }, error => {
                console.log("erro ao carregar usuario");
            });
    }
}
