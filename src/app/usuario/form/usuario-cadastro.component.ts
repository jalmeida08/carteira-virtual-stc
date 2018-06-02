import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../pessoa/pessoa.service';
import { UsuarioService } from '../usuario.service';
import { Pessoa } from '../../pessoa/pessoa';
import { Usuario } from '../usuario';
import { Mensagem } from '../mensagem';

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
        private _pessoaService: PessoaService
    ) {
        this._usuarioService = _usuarioService;
        this._pessoaService = _pessoaService;
    }

    ngOnInit(): void { }

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
}
