import { Component, OnInit } from '@angular/core';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  private _pessoaService: PessoaService;
  public pessoa: Pessoa = new Pessoa();
  public pessoas: Pessoa[];
  public acRemover: boolean = false;

  constructor(pessoaService: PessoaService, private modalService: NgbModal) {
    this._pessoaService = pessoaService;
  }


  public remover(pessoa: Pessoa): void {
    if (confirm("Deseja Remover?")) {
      this._pessoaService
        .remover(pessoa)
        .subscribe(res => {
          console.log(res);
        }, erro => {
          console.log(erro);
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
