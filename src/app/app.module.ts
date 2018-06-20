import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { PessoaModule } from './pessoa/pessoa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DespesaModule } from "./despesa/despesa.module"
import { PagamentoModule } from './pagamento/pagamento.module';
import { ParcelaModule } from './parcela/parcela.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertaModule } from './alerta/alerta.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    routing,
    HttpModule,
    PessoaModule,
    UsuarioModule,
    DespesaModule,
    PagamentoModule,
    ParcelaModule,
    AlertaModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})

export class AppModule { }
