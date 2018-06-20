import { Component, OnInit } from '@angular/core';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Mensagem } from '../alerta/mensagem';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  private _pessoaService: PessoaService;
  public pessoa: Pessoa = new Pessoa();
  public pessoas: Pessoa[];
  public mensagens: Array<Mensagem> = new Array<Mensagem>();

  constructor(pessoaService: PessoaService) {
    this._pessoaService = pessoaService;
  }

  public remover(pessoa: Pessoa): void {
    if (confirm("Deseja Remover?")) {
      this._pessoaService
        .remover(pessoa)
        .subscribe(res => {
          let novaLista = this.pessoas.slice(0);
          let indice = novaLista.indexOf(pessoa);
          novaLista.splice(indice, 1);
          this.pessoas = novaLista;
          this.mensagens.push(
            {
              mensagem: "Excluído com sucesso",
              tipoMensagem: "success",
              mensagemDesaque: "Sucesso! "
            }
          );
        }, error => {
          this.mensagens.push(
            {
              mensagem: "Erro ao excluir",
              tipoMensagem: "danger",
              mensagemDesaque: "Erro! "
            }
          );
        });
    }
  }

  public listarPessoas(): void {
    this._pessoaService.listar()
      .subscribe(res => {
        this.pessoas = res;
      }, erro => {
        console.log("Este é o erro: " + erro)
      });
  }

  public carregarPessoa(pessoa: Pessoa): void {
    this.pessoa = pessoa;
  }

  ngOnInit() {
    this.listarPessoas();
  }

}
