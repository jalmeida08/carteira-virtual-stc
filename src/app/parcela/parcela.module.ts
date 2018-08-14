import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParcelaComponent } from './parcela.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing } from '../app.routes';
import { Parcela } from './parcela';
import { ParcelaService } from './parcela.service';

@NgModule({
    declarations: [ParcelaComponent],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        routing,
    ],
    exports: [ParcelaComponent],
    providers: [ParcelaService],
})
export class ParcelaModule { }