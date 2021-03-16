import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Contato } from './contato';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {

  private urlContato = 'http://localhost:8080' + '/contato';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /*getContatos(): Observable<Contato[]> {
    //this.messageService.add('ContatoService: fetched contatos');
    console.log('ContatoService: retornados todos os contatos.');
    return of(CLIENTES);
  }*/

  /** GET heroes from the server */
  getContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.urlContato + '/all')
      .pipe(
        tap(_ => console.log('retornados contatos')),
        catchError(this.handleError<Contato[]>('getContatos', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getContato(id: number): Observable<Contato> {
    const url = `${this.urlContato}/get/${id}`;
    return this.http.get<Contato>(url).pipe(
      tap(_ => console.log(`retornado contato id=${id}`)),
      catchError(this.handleError<Contato>(`getContato id=${id}`))
    );
  }    

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.urlContato + '/add', contato, this.httpOptions).pipe(
      tap((newContato: Contato) => console.log(`Adicionado contato com id=${newContato.id}.`)),
      catchError(this.handleError<Contato>('addContato'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteContato(contato: Contato | number): Observable<Contato> {
    const id = typeof contato === 'number' ? contato : contato.id;
    const url = `${this.urlContato}/delete/${id}`;

    return this.http.delete<Contato>(url, this.httpOptions).pipe(
      tap(_ => console.log(`Deletado contato id=${id}.`)),
      catchError(this.handleError<Contato>('deleteContato'))
    );
  }

  /** PUT: update the hero on the server */
  updateContato(contato: Contato): Observable<any> {
    const url = this.urlContato + '/update/' + contato.id;
    return this.http.put(url, contato, this.httpOptions).pipe(
      tap(_ => console.log(`alterado contato id=${contato.id}`)),
      catchError(this.handleError<any>('updateContato'))
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