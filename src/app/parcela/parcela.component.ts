import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment/moment';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Parcela } from './parcela';
import { Pagamento } from '../pagamento/pagamento';
import { DatePipe } from '@angular/common';
import { Despesa } from '../despesa/despesa';

@Component({
    selector: 'app-parcela',
    templateUrl: './parcela.component.html',
    styleUrls: ['./parcela.component.css']
})
export class ParcelaComponent implements OnInit {

    @Input() public parcela: Parcela = new Parcela();
    @Input() public pagamentoParcelado: boolean = false;
    @Input() public despesa: Despesa = new Despesa();
    @Input() public parcelas : Array<Parcela> = new Array<Parcela>();

    public qtdParcela: number;
    public foraDos30Dias: boolean = false;
    public deQuantosEmQuantosDias: number;
    public dataVencimento: string;

    constructor(
        private _datePipe: DatePipe
    ) {
        this._datePipe = _datePipe;
    }

    public calcularValorParcela() {
        //console.log(this.qtdParcela);
        //console.log(this.despesa.valor);
        if (this.qtdParcela > 0 && this.despesa.valor > 0) {
            this.parcela.valorParcela = (this.despesa.valor / this.qtdParcela);
        }
    }

    public calcularParcelas() {
        this.parcelas = new Array<Parcela>();
        for (let i: number = 0; i < this.qtdParcela; i++) {
            let p: Parcela = new Parcela();
            if(!this.foraDos30Dias){
                this.calcularDias(p, 30, i);
            }else{
                this.calcularDias(p, this.deQuantosEmQuantosDias, i);
            }
        }
    }

    public calcularDias (p: Parcela, dias : number, posicao: number){
        if (this.parcelas.length > 0) {
            p.dataVencimento = moment(this.parcelas[posicao-1].dataVencimento).add(dias, 'days').toDate();
            p.valorParcela = this.parcela.valorParcela;
            this.parcelas.push(p);
            this.checarDiasDoMes(p);
        }else{
            p.dataVencimento = moment(this.dataVencimento).add(dias, 'days').toDate();
            p.valorParcela = this.parcela.valorParcela;                
            this.parcelas.push(p);
            this.checarDiasDoMes(p);
        }
        console.log(this.parcelas);
    }

    public checarDiasDoMes(parcela : Parcela){
        //console.log(new Date(parcela.dataVencimento).getUTCDate());
    }

    ngOnInit(): void { }
}
