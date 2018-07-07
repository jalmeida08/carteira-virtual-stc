import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DespesaComponent } from './despesa.component';
import { DespesaCadastroComponent } from './cadastro/despesa-cadastro.component';
import { DespesaService } from './despesa.service';
import { ParcelaModule } from '../parcela/parcela.module';
import { AlertaModule } from '../alerta/alerta.module';
import { routing } from '../app.routes';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        DespesaComponent,
        DespesaCadastroComponent
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
    providers: [DespesaService],
})
export class DespesaModule { }