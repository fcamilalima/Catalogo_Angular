import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs';
import { Categoria } from '../model/categoria';
import { Usuario } from '../model/usuario';

const apiURL = 'http://localhost:7300/api/v1/Categorias/';
const apiLoginUrl = 'http://localhost:7300/api/Auth/login';
var token: string | null = null;
var httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    })
};

@Injectable(
  {
    providedIn: 'root'
  }
)

export class ApiService {

  constructor(private http: HttpClient) { }

  montarHeaderToken() {
    token = localStorage.getItem('jwt');
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
  }

  Login(Usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(apiLoginUrl, Usuario).pipe(
      tap((Usuario: Usuario) => {
        console.log(`Usuário logado com sucesso!`);
      }),
      catchError(this.handleError<Usuario>('Login'))
    );
  }

  getCategorias(): Observable<Categoria[]> {
    this.montarHeaderToken();
    // console.log(httpOptions.headers);
    return this.http.get<Categoria[]>(apiURL, httpOptions).pipe(
      tap(Categorias => console.log('Leu as Categorias')),
      catchError(this.handleError('getCategorias', []))
    );
  }

  getCategoria(id: number): Observable<Categoria> {
    const url = `${apiURL}${id}`;
    console.log(`URL = ${url}`);
    return this.http.get<Categoria>(url, httpOptions).pipe(
      tap(_ => console.log(`Lida a Categoria id = ${id}`)),
      catchError(this.handleError<Categoria>(`Erro no endpoint getCategoria id=${id}`))
    );
  }

  addCategoria(categoria: Categoria): Observable<Categoria> {
    this.montarHeaderToken();
    return this.http.post<Categoria>(apiURL, categoria, httpOptions).pipe(
      tap((c: Categoria) => console.log(`
      Adicionada a Categoria com id = ${c.categoriaId}`)),
      catchError(this.handleError<Categoria>('addCategoria'))
    )
  }

  updateCategoria(id: number, Categoria: Categoria): Observable<any> {
    this.montarHeaderToken();
    const url = `${apiURL}${id}`;
    return this.http.put(url, Categoria, httpOptions).pipe(
      tap(_ => console.log(`Atualizado o produto id = ${id}`)),
      catchError(this.handleError<any>('updateCategoria'))
    )
  }

  deleteCategoria(id: number): Observable<Categoria> {
    const url = `${apiURL}${id}`;
    return this.http.delete<Categoria>(url, httpOptions).pipe(
      tap(_ => console.log(`Removida a Categoria id = ${id}`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('Erro no serviço: ' + error);
      return of(result as T);
    };
  }
}