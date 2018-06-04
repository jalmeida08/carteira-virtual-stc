import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentoComponent } from './pagamento.component';
import { PagamentoCadastroComponent } from './cadastro/pagamento-cadastro.component';
import { PagamentoService } from './pagamento.service';

@NgModule({
    declarations: [
        PagamentoComponent,
        PagamentoCadastroComponent
    ],
    imports: [CommonModule],
    exports: [],
    providers: [PagamentoService],
})
export class PagamentoModule { }