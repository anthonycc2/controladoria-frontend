import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContatosComponent } from './contatos/contatos.component';
import { ContatoDetalheComponent } from './contato-detalhe/contato-detalhe.component';
import { GruposComponent } from './grupos/grupos.component';
import { GrupoDetalheComponent } from './grupo-detalhe/grupo-detalhe.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/contatos', pathMatch: 'full' },
  { path: 'contato/:id', component: ContatoDetalheComponent },
  { path: 'contatos', component: ContatosComponent },
  { path: 'grupo/:id', component: GrupoDetalheComponent },
  { path: 'grupos', component: GruposComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }