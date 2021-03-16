import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Grupo } from './grupo';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {

  private urlGrupo = 'http://localhost:8080' + '/grupo';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /*getGrupos(): Observable<Grupo[]> {
    //this.messageService.add('GrupoService: fetched grupos');
    console.log('GrupoService: retornados todos os grupos.');
    return of(CLIENTES);
  }*/

  /** GET heroes from the server */
  getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.urlGrupo + '/all')
      .pipe(
        tap(_ => console.log('retornados grupos')),
        catchError(this.handleError<Grupo[]>('getGrupos', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getGrupo(id: number): Observable<Grupo> {
    const url = `${this.urlGrupo}/get/${id}`;
    return this.http.get<Grupo>(url).pipe(
      tap(_ => console.log(`retornado grupo id=${id}`)),
      catchError(this.handleError<Grupo>(`getGrupo id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addGrupo(grupo: Grupo): Observable<Grupo> {
    return this.http.post<Grupo>(this.urlGrupo + '/add', grupo, this.httpOptions).pipe(
      tap((newGrupo: Grupo) => console.log(`Adicionado grupo com id=${newGrupo.id}.`)),
      catchError(this.handleError<Grupo>('addGrupo'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteGrupo(grupo: Grupo | number): Observable<Grupo> {
    const id = typeof grupo === 'number' ? grupo : grupo.id;
    const url = `${this.urlGrupo}/delete/${id}`;

    return this.http.delete<Grupo>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado grupo id=${id}.`)),
      catchError(this.handleError<Grupo>('deleteGrupo'))
    );
  }

  /** PUT: update the hero on the server */
  updateGrupo(grupo: Grupo): Observable<any> {
    const url = this.urlGrupo + '/update/' + grupo.id;
    return this.http.put(url, grupo, this.httpOptions).pipe(
      tap(_ => console.log(`alterado grupo id=${grupo.id}`)),
      catchError(this.handleError<any>('updateGrupo'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} falhou: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}