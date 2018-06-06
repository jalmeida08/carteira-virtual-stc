import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentoComponent } from './pagamento.component';
import { PagamentoCadastroComponent } from './cadastro/pagamento-cadastro.component';
import { PagamentoService } from './pagamento.service';
import { routing } from '../app.routes';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

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
        routing],
    exports: [],
    providers: [PagamentoService],
})
export class PagamentoModule { }