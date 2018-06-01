import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaComponent } from "./pessoa.component"
import { PessoaService } from "./pessoa.service"
import { PessoaFormComponent } from './form/pessoa-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        PessoaFormComponent,
        PessoaComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [],
    providers: [PessoaService]
})
export class PessoaModule { }