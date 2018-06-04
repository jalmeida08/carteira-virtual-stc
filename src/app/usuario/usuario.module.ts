import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { UsuarioComponent } from './usuario.component';
import { UsuarioCadastroComponent } from './form/usuario-cadastro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from '../app.routes';

@NgModule({
  declarations: [
    UsuarioComponent,
    UsuarioCadastroComponent
  ],
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule,
    routing 
  ],
  exports: [],
  providers: [UsuarioService],
})
export class UsuarioModule { }