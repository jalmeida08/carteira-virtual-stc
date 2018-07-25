import { Component, OnInit } from '@angular/core';
import { Despesa } from './despesa';
import { DespesaService } from './despesa.service';

@Component({
    selector: 'app-despesa',
    templateUrl: './despesa.component.html',
    styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit {

    public despesas: Array<Despesa> = new Array<Despesa>();
    public despesa: Despesa = new Despesa();

    constructor(
        private _despesaService: DespesaService
    ) {
        this._despesaService = _despesaService;
    }

    public listarDespesas() {
        this._despesaService
            .listarDespesas()
            .subscribe(res => {
                this.despesas = res;
            }, error => {
                console.log("error ", error);
            })
    }

    ngOnInit() {
        this.listarDespesas();
    }

}
