import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Contato } from '../contato';
import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contato-detalhe',
  templateUrl: './contato-detalhe.component.html',
  styleUrls: [ './contato-detalhe.component.css' ]
})
export class ContatoDetalheComponent implements OnInit {
  contato: Contato;

  constructor(
    private route: ActivatedRoute,
    private contatoService: ContatoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getContato();
  }

  getContato(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.contatoService.getContato(id)
      .subscribe(contato => this.contato = contato);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.contatoService.updateContato(this.contato)
      .subscribe(() => this.goBack());
  }
}