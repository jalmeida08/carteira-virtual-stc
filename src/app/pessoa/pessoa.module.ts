import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PessoaComponent } from "./pessoa.component"
import { PessoaService } from "./pessoa.service"
import { PessoaFormComponent } from './form/pessoa-form.component';
import { routing } from './../app.routes';
import { AlertaModule } from '../alerta/alerta.module';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    declarations: [
        PessoaFormComponent,
        PessoaComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        NgbModule.forRoot(),
        FormsModule,
        routing,
        AlertaModule
    ],
    exports: [],
    providers: [CookieService, PessoaService]
})
export class PessoaModule { }