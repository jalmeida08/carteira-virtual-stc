import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PessoaModule } from './pessoa/pessoa.module';

import { routing } from './app.routes';
import { registerLocaleData } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioService } from './usuario/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    routing,
    FormsModule,
    HttpModule,
    PessoaModule
  ],
  providers: [
    UsuarioService
  ],
  bootstrap: [AppComponent],

})

export class AppModule { }
