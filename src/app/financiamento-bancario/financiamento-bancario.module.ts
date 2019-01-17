import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanciamentoBancarioComponent } from './financiamento-bancario.component';
import { FinanciamentoBancarioService } from './financiamento-bancario.service';

@NgModule({
    declarations: [
        FinanciamentoBancarioComponent],
    imports: [CommonModule,],
    exports: [],
    providers: [
        FinanciamentoBancarioService
    ],
})
export class FinanciamentoBancarioModule {}