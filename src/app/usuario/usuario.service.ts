import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Response } from "@angular/http/src/static_response";
import { Observable, pipe } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Usuario } from './usuario';
import { Pessoa } from '../pessoa/pessoa';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;
  private _url: string = "http://localhost:8080/carteiravirtual/resources/usuario/";
  private _http: Http;
  private _headers: Headers;

  constructor(http: Http) {
    this._http = http;
  }

  public salvar(usuario: Usuario): Observable<Response> {
    return this._http
      .post(
        this._url,
        usuario,
        { headers: this._headers }
      );
  }

  public listar(): Observable<Usuario[]> {
    return this._http
      .get(this._url)
      .pipe(
        map(res => res.json()
        )
      );
  }

  public getUsuario(idUsuario: number): Observable<Usuario> {
    return this._http
      .get(this._url + idUsuario)
      .pipe(
        map(res => res.json())
      );
  }

  public remover(usuario: Usuario): Observable<Response> {
    return this._http
      .delete(
        this._url + usuario.idUsuario
      );
  }

  public atualizar(usuario: Usuario): Observable<Response> {
    return this._http
      .put(
        this._url,
        usuario,
        { headers: this._headers }
      );
  }

}
