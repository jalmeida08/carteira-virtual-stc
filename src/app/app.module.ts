import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { PessoaModule } from './pessoa/pessoa.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DespesaModule } from "./despesa/despesa.module"
import { PagamentoModule } from './pagamento/pagamento.module';
import { ParcelaModule } from './parcela/parcela.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertaModule } from './alerta/alerta.module';
import { InstituicaoFinanceiraModule } from './instituicao-financeira/instituicao-financeira.module';
import { FinanciamentoBancarioModule } from './financiamento-bancario/financiamento-bancario.module';
import { LoginModule } from './login/login.module';
import { DataService } from './data/data.service';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpsRequestInterceptor } from './util/interceptor.component';
import { HomePageModule } from './home-page/home-page.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    routing,
    HttpClientModule,
    LoginModule,
    PessoaModule,
    UsuarioModule,
    DespesaModule,
    PagamentoModule,
    ParcelaModule,
    AlertaModule,
    InstituicaoFinanceiraModule,
    FinanciamentoBancarioModule,
    HomePageModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    },
    CookieService,
    DataService,
  ],
  bootstrap: [AppComponent],

})

export class AppModule { }