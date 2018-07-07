import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PessoaComponent } from './pessoa/pessoa.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PessoaFormComponent } from './pessoa/form/pessoa-form.component';
import { UsuarioCadastroComponent } from './usuario/form/usuario-cadastro.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { PagamentoCadastroComponent } from './pagamento/cadastro/pagamento-cadastro.component';
import { ParcelaComponent } from './parcela/parcela.component';
import { DespesaComponent } from './despesa/despesa.component';
import { DespesaCadastroComponent } from './despesa/cadastro/despesa-cadastro.component';

const appRoutes: Routes = [
    { path: 'pessoa', component: PessoaComponent },
    { path: 'pessoa/cadastrar', component: PessoaFormComponent },
    { path: 'pessoa/form/:id', component: PessoaFormComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'usuario/cadastrar', component: UsuarioCadastroComponent },
    { path: 'usuario/form/:id', component: UsuarioCadastroComponent },
    { path: 'pagamento', component: PagamentoComponent },
    { path: 'pagamento/cadastrar', component: PagamentoCadastroComponent },
    { path: 'pagamento/form/:id', component: PagamentoCadastroComponent },
    { path: 'parcela', component: ParcelaComponent },
    { path: 'despesa', component: DespesaComponent },
    { path: 'despesa/cadastrar', component: DespesaCadastroComponent },

    { path: '**', redirectTo: 'pessoa' }
];

export const routing = RouterModule.forRoot(appRoutes);
