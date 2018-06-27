import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment/moment';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Parcela } from './parcela';
import { Pagamento } from '../pagamento/pagamento';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-parcela',
    templateUrl: './parcela.component.html',
    styleUrls: ['./parcela.component.css']
})
export class ParcelaComponent implements OnInit {

    @Input() public parcela: Parcela = new Parcela();
    @Input() public pagamentoParcelado: boolean = false;
    @Input() public pagamento: Pagamento = new Pagamento();

    public parcelas : Parcela[];
    public qtdParcela: number;
    public aCada30Dias: boolean;
    public deQuantosEmQuantosDias: number;
    public dataVencimento: string;

    constructor(
        private _datePipe: DatePipe
    ) {
        this._datePipe = _datePipe;
    }

    public calcularValorParcela() {
        if (this.qtdParcela > 0 && this.pagamento.valor > 0) {
            this.parcela.valorParcela = (toInteger(this.pagamento.valor) / this.qtdParcela);
        }
    }

    public calcularParcelas() {
        this.parcelas = new Array<Parcela>();
        for (let i: number = 0; i < this.qtdParcela; i++) {
            let p: Parcela = new Parcela();
            if (this.parcelas.length > 0) {
                p.dataVencimento = moment(this.parcelas[i-1].dataVencimento).add(30, 'days').toDate();
                p.valorParcela = this.parcela.valorParcela;
                this.parcelas.push(p);
                this.checarDiasDoMes(p);
            }else{
                p.dataVencimento = moment(this.dataVencimento).add(30, 'days').toDate();
                p.valorParcela = this.parcela.valorParcela;                
                this.parcelas.push(p);
                this.checarDiasDoMes(p);
            }

        }
    }

    public checarDiasDoMes(parcela : Parcela){
        console.log(new Date(parcela.dataVencimento).getUTCDate());
    }

    ngOnInit(): void { }
}
