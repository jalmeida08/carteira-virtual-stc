import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentoComponent } from './pagamento.component';
import { PagamentoCadastroComponent } from './cadastro/pagamento-cadastro.component';
import { PagamentoService } from './pagamento.service';
import { routing } from '../app.routes';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AlertaModule } from '../alerta/alerta.module';
import { ParcelaModule } from '../parcela/parcela.module';

@NgModule({
    declarations: [
        PagamentoComponent,
        PagamentoCadastroComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        NgbModule.forRoot(),
        FormsModule,
        routing,
        AlertaModule,
        ParcelaModule
    ],
    exports: [],
    providers: [PagamentoService],
})
export class PagamentoModule { }