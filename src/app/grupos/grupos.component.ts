import { Component, OnInit, Input } from '@angular/core';
import { Grupo } from '../grupo';
import { GrupoService } from '../grupo.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  grupo: Grupo;
  grupos: Grupo[];

  constructor(private grupoService: GrupoService) { }

  ngOnInit() {
    this.grupo = {
      id: 0,
      nome: ''
    };
    this.getGrupos();
  }

  getGrupos() {
    this.grupoService.getGrupos()
        .subscribe(grupos => this.grupos = grupos);
  }

  add(): void {
    this.grupoService.addGrupo(this.grupo)
    .subscribe(grupo => {
      this.getGrupos();
    });
    document.getElementById('nomeGrupo').textContent='';
  }

  delete(grupo: Grupo): void {
    this.grupos = this.grupos.filter(h => h !== grupo);
    this.grupoService.deleteGrupo(grupo).subscribe();
  }

}