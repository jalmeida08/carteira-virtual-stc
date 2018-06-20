import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mensagem } from './mensagem';

@Component({
    selector: 'app-alerta',
    templateUrl: './alerta.component.html',
    styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {
    
    @Input() mensagens = new Array<Mensagem>();

    constructor() { 
        
    }
    
    public closeAlert(alert: Mensagem) {
        const index: number = this.mensagens.indexOf(alert);
        this.mensagens.splice(index, 1);
    }

    ngOnInit(): void { }
}
