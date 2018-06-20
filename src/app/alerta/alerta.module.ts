import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertaComponent } from './alerta.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [AlertaComponent],
    imports: [
        CommonModule,
        NgbModule.forRoot()
    ],
    exports: [AlertaComponent],
    providers: [],
})
export class AlertaModule { }