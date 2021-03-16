import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';

@Component({
  selector: 'app-grupo-detalhe',
  templateUrl: './grupo-detalhe.component.html',
  styleUrls: [ './grupo-detalhe.component.css' ]
})
export class GrupoDetalheComponent implements OnInit {
  grupo: Grupo;

  constructor(
    private route: ActivatedRoute,
    private grupoService: GrupoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getGrupo();
  }

  getGrupo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.grupoService.getGrupo(id)
      .subscribe(grupo => this.grupo = grupo);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.grupoService.updateGrupo(this.grupo)
      .subscribe(() => this.goBack());
  }
}