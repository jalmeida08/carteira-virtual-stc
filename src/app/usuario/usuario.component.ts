import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { Usuario } from './usuario';
import { Pessoa } from '../pessoa/pessoa';
import { Mensagem } from './mensagem';

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

  public closeAlert(alert: Mensagem) {
    const index: number = this.mensagens.indexOf(alert);
    this.mensagens.splice(index, 1);
  }

  public listar(): void {
    this._usuarioService
      .listar()
      .subscribe(res => {
        this.usuarios = res;
      }, error => {
        console.log("erro ", error);
      }
    );
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
          this.mensagens.push({
            mensagem: "Excluido com sucesso",
            mensagemDesaque: "Sucesso!",
            tipoMensagem: "success"
          });
        }, error => {
          this.mensagens.push({
            mensagem: "Erro ao excluir " + error,
            mensagemDesaque: "Erro!",
            tipoMensagem: "danger"
          });
        }
      );
    }
  }

  public carregarUsuario(usuario: Usuario): void {

  }

}
