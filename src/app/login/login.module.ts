import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { AlertaModule } from '../alerta/alerta.module';
import { routing } from '../app.routes';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        BrowserModule,
        CommonModule,
        NgbModule.forRoot(),
        FormsModule,
        routing,
        AlertaModule],
    exports: [],
    providers: [LoginService],
})
export class LoginModule {}