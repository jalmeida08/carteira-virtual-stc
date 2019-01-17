import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituicaoFinanceiraService } from './instituicao-financeira.service';
import { InstituicaoFinanceiraComponent } from './instituicao-financeira.component';

@NgModule({
    declarations: [ 
        InstituicaoFinanceiraComponent,
    ],
    imports: [CommonModule],
    exports: [],
    providers: [
        InstituicaoFinanceiraService
    ],
})
export class InstituicaoFinanceiraModule {}