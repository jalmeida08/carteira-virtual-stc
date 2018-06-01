import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PessoaComponent } from './pessoa/pessoa.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PessoaFormComponent } from './pessoa/form/pessoa-form.component';

const appRoutes: Routes = [
    { path: 'pessoa', component: PessoaComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'pessoa/cadastrar', component: PessoaFormComponent },
    { path: '**', redirectTo: 'pessoa' }
];

export const routing = RouterModule.forRoot(appRoutes);
