import { Component, OnInit, Input } from '@angular/core';
import { Parcela } from './parcela';
import { Pagamento } from '../pagamento/pagamento';

@Component({
    selector: 'app-parcela',
    templateUrl: './parcela.component.html',
    styleUrls: ['./parcela.component.css']
})
export class ParcelaComponent implements OnInit {
    
    @Input() public parcela : Parcela = new Parcela();
    @Input() public pagamentoParcelado : boolean = false;
    @Input() public pagamento : Pagamento = new Pagamento();
    
    public qtdParcela : number;
    
    constructor() { }

    public calcularValorParcela(valor){
        this.parcela.valorParcela = (valor / this.qtdParcela);
    }

    ngOnInit(): void { }
}
