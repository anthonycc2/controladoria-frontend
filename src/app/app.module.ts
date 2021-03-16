import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ContatosComponent } from './contatos/contatos.component';
import { ContatoDetalheComponent } from './contato-detalhe/contato-detalhe.component';
import { GruposComponent } from './grupos/grupos.component';
import { GrupoDetalheComponent } from './grupo-detalhe/grupo-detalhe.component';

@NgModule({
  declarations: [
    AppComponent,
    ContatosComponent,
    ContatoDetalheComponent,
    GruposComponent,
    GrupoDetalheComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    // no need to place any providers due to the `providedIn` flag...
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }