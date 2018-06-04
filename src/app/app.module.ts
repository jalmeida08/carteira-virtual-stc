import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { PessoaModule } from './pessoa/pessoa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DespesaModule } from "./despesa/despesa.module"
import { PagamentoModule } from './pagamento/pagamento.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    PessoaModule,
    UsuarioModule,
    DespesaModule,
    PagamentoModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})

export class AppModule { }
