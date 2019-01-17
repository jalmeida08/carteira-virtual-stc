import { Component, OnInit } from '@angular/core';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Mensagem } from '../alerta/mensagem';
import { DataService } from '../data/data.service';
import { UsuarioLogado } from '../login/usuario-logado';

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
    public usuarioLogado: UsuarioLogado = new UsuarioLogado();

    constructor(
        pessoaService: PessoaService,
        private _dataService: DataService
    ) {
        this._pessoaService = pessoaService;
        this._dataService = _dataService;
    }

    public remover(pessoa: Pessoa): void {
        if (confirm("Deseja Remover?")) {
            this._pessoaService
                .remover(pessoa)
                .subscribe(res => {
                    let novaLista = [].concat(this.pessoas);
                    novaLista.splice(novaLista.indexOf(pessoa), 1);
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
            .subscribe((res: Pessoa[]) => {
                this.pessoas = res;
            }, erro => {
                console.log("Este é o erro: " + erro);
            });
        }
        
        public carregarPessoa(pessoa: Pessoa): void {
            this.pessoa = pessoa;
        }
        
        public capturarSessao() {
            this.usuarioLogado.token = this._dataService.capturarSessao();
            
    }
    
    ngOnInit() {
        this.capturarSessao();
        this.listarPessoas();
    }

}
