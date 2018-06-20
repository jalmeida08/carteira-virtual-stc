import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../pessoa/pessoa.service';
import { UsuarioService } from '../usuario.service';
import { Pessoa } from '../../pessoa/pessoa';
import { Usuario } from '../usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { Mensagem } from '../../alerta/mensagem';

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

    private salvarPessoa() {
        this._pessoaService
            .salvar(this.pessoa)
            .subscribe(res => {
                this.buscarPessoaNomeDtNascimento();
            }, error => {
                this.alerta("Erro ao salvar", "danger", "Erro! ");
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
                this.alerta("Erro " + error, "danger", "Erro! ");
            });
    }

    private salvarUsuario(pessoa: Pessoa) {
        this.usuario.pessoa = pessoa;
        this._usuarioService
            .salvar(this.usuario)
            .subscribe(res => {
                this.pessoa = new Pessoa();
                this.usuario = new Usuario();
                this.confirmarSenha = undefined;
                this.alerta("Salvo com sucesso", "success", "Sucesso! ");                
            }, error => {
                this.alerta("Erro ao salvar", "danger", "Erro! ");
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
                this.alerta("Erro " + error, "danger", "Erro! ");
            });
    }
}
