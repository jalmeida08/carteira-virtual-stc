import { Component, OnInit } from '@angular/core';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Mensagem } from '../usuario/mensagem';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  private _pessoaService: PessoaService;
  public pessoa: Pessoa = new Pessoa();
  public pessoas: Pessoa[];
  public mensagens: Mensagem[] = new Array<Mensagem>();

  constructor(pessoaService: PessoaService) {
    this._pessoaService = pessoaService;
  }

  public closeAlert(alert: Mensagem) {
    const index: number = this.mensagens.indexOf(alert);
    this.mensagens.splice(index, 1);
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
          this.mensagens.push({
            mensagem: "Excluido com sucesso",
            mensagemDesaque: "Sucesso!",
            tipoMensagem: "success"
          });
        }, erro => {
          this.mensagens.push({
            mensagem: "Erro ao excluir",
            mensagemDesaque: "Erro!",
            tipoMensagem: "danger"
          });
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
