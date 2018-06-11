import { Component, OnInit } from '@angular/core';
import { Pagamento } from './pagamento';
import { PagamentoService } from './pagamento.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-pagamento',
    templateUrl: './pagamento.component.html',
    styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {
    public pagamento: Pagamento = new Pagamento();
    public pagamentos: Pagamento[] = new Array<Pagamento>();

    constructor(
        private _pagamentoService: PagamentoService,
        private _modalService: NgbModal
    ) {
        this._pagamentoService = _pagamentoService;
    }

    public listarPagamentos(): void {
        this._pagamentoService
            .listarPagamentos()
            .subscribe(res => {
                this.pagamentos = res
            }, error => {
                console.log("erro ", error);
            })
    }

    openLg(content, pagamento : Pagamento) {
        this.pagamento = pagamento;
        this._modalService.open(content, { size: 'lg' });
      }
    ngOnInit(): void {
        this.listarPagamentos();
    }
}
