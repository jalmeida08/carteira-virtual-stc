import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { PessoaModule } from './pessoa/pessoa.module';
import { UsuarioModule } from './usuario/usuario.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    PessoaModule,
    UsuarioModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})

export class AppModule { }
