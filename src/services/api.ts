import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs';
import { Categoria } from '../model/categoria';
import { Usuario } from '../model/usuario';
import { InvalidatedProjectKind } from 'typescript';

const apiURL = 'http://localhost:7300/api/v1/Categorias';
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

  montarHeaderToken(){
    token = localStorage.getItem('jwt');
    console.log('jwt header token ' + token);
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
   })
 }; 
}

Login(Usuario: Usuario) : Observable<Usuario> {
  return this.http.post<Usuario>(apiLoginUrl, Usuario).pipe(
    tap((Usuario: Usuario) => console.log(`Login usuário com email = ${Usuario.email}`)),
    catchError(this.handleError<Usuario>('Login'))
  );
}

getCategorias() : Observable<Categoria[]>{
  this.montarHeaderToken();
  console.log(httpOptions.headers);
  return this.http.get<Categoria[]>(apiURL, httpOptions).pipe(
    tap(Categorias => console.log('Leu as Categorias')),
    catchError(this.handleError('getCategorias', []))
  );
}

getCategoria(id: number):Observable<Categoria>{
  const url = `${apiURL}${id}`;
  return this.http.get<Categoria>(url, httpOptions).pipe(
    tap(_ => console.log(`Lida a Categoria id = ${id}`)),
    catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
  );
}

addCategoria() : Observable<Categoria>{
  this.montarHeaderToken();
  return this.http.post<Categoria>(apiURL, Categoria, httpOptions).pipe(
    tap((Categoria: Categoria) => console.log(`
      Adicioinada a Categoria com id = ${Categoria.categoriaId}`)),
    catchError(this.handleError<Categoria>('addCategoria'))
  )
}

updateCategoria(id: number, Categoria: Categoria) : Observable<any>{
  this.montarHeaderToken();
  const url = `${apiURL}${id}`;
  return this.http.put(url, Categoria, httpOptions).pipe(
    tap(_ => console.log(`Atualizado o produto id = ${id}`)),
    catchError(this.handleError<any>('updateCategoria'))
  )
}

deleteCategoria(id: number) : Observable<Categoria>{
  const url = `${apiURL}${id}`;
    return this.http.delete<Categoria>(url, httpOptions).pipe(
    tap(_ => console.log(`Removida a Categoria id = ${id}`)),
    catchError(this.handleError<Categoria>('deleteCategoria'))
  );
}

private handleError<T>(operation = 'operation', result?: T){
  return (error: any): Observable<T> => {
    console.error(error);
    return of (result as T);
  };
}
}