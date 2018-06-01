import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { Usuario } from './usuario';
import { Pessoa } from '../pessoa/pessoa';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public pessoa: Pessoa = new Pessoa();
  public confirmarSenha: string;
  public senhasDiferentes : boolean = false;

  constructor(
    private _usuarioService: UsuarioService,
    private _pessoaService: PessoaService
  ) {
    this._usuarioService = _usuarioService;
    this._pessoaService = _pessoaService;
  }

  public salvar(): void {
    this.salvarPessoa();
  }

  private salvarPessoa() {
    console.log("salvando pessoa");
    this._pessoaService
      .salvar(this.pessoa)
      .subscribe(res => {
        this.buscarPessoaNomeDtNascimento();
      }, error => {
        console.log(error);
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
        console.log(error);
      });
  }

  private salvarUsuario(pessoa: Pessoa) {
    this.usuario.pessoa = pessoa;
    this._usuarioService
      .salvar(this.usuario)
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      });
  }

  public checarSenha(){
    if(this.usuario.senha === this.confirmarSenha){
      this.senhasDiferentes = false;
    }else{
      this.senhasDiferentes = true
    }
  }

  ngOnInit() {
  }

}
