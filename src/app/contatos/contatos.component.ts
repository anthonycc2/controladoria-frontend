import { Component, OnInit, Input } from '@angular/core';
import { Contato } from '../contato';
import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {
  contato: Contato;
  contatos: Contato[];

  constructor(private contatoService: ContatoService) { }

  ngOnInit() {
    this.contato = {
      id: 0,
      nome: '',
      email: '',
      telefone: '',
      grupo: {
        id: 0,
        nome: ''
      }
    };
    this.getContatos();
  }

  getContatos() {
    this.contatoService.getContatos()
        .subscribe(contatos => this.contatos = contatos);
  }

  add(): void {
    this.contatoService.addContato(this.contato)
    .subscribe(contato => {
      this.getContatos();
    });
    document.getElementById('nomeContato').textContent='';
    document.getElementById('emailContato').textContent='';
    document.getElementById('telefoneContato').textContent='';
  }

  delete(contato: Contato): void {
    this.contatos = this.contatos.filter(h => h !== contato);
    this.contatoService.deleteContato(contato).subscribe();
  }

}