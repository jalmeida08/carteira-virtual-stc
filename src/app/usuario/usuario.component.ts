import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { Usuario } from './usuario';
import { Pessoa } from '../pessoa/pessoa';
import { Mensagem } from '../alerta/mensagem';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

    public usuario: Usuario = new Usuario();
    public pessoa: Pessoa = new Pessoa();
    public usuarios: Usuario[] = new Array<Usuario>();
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

    ngOnInit() {
        this.listar();
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
    
    public listar(): void {
        this._usuarioService
            .listar()
            .subscribe(res => {
                this.usuarios = res;
            }, error => {
                this.alerta("Erro "+error, "danger", "Erro! ");
            });
    }

    public remover(usuario: Usuario): void {
        let novaLista: Usuario[] = new Array<Usuario>();
        let indice: number;
        if (confirm("Deseja realmente remover?")) {
            this._usuarioService
                .remover(usuario)
                .subscribe(res => {
                    novaLista = this.usuarios.slice(0);
                    indice = novaLista.indexOf(usuario);
                    novaLista.splice(indice, 1);
                    this.usuarios = novaLista;
                    this.alerta("Salvo com sucesso", "success", "Sucesso! ");                
                }, error => {
                    this.alerta("Erro ao remover", "danger", "Erro! ");
                });
        }
    }

    public carregarUsuario(usuario: Usuario): void {

    }
}