import { Pessoa } from './pessoa';
import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Response } from "@angular/http/src/static_response";
import { Observable, pipe } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private _http: Http;
  private _headers: Headers;
  private _url: string = "http://localhost:8080/carteiravirtual/resources/pessoa/"

  constructor(http: Http) {
    this._http = http;
  }

  public salvar(pessoa: Pessoa): Observable<Response> {
    return this._http
      .post(
        this._url,
        pessoa,
        { headers: this._headers }
      );
  }

  public listar(): Observable<Pessoa[]> {
    return this._http
      .get(this._url)
      .pipe(
        map(
          res => res.json()
        )
      );
  };

  public getPessoa(idPessoa: number): Observable<Pessoa> {
    return this._http
      .get(this._url + idPessoa)
      .pipe(
        map(res => res.json())
      );
  }

  public remover(pessoa: Pessoa): Observable<Response> {
    return this._http
      .delete(this._url + pessoa.idPessoa);
  }

  public atualizar(pessoa: Pessoa): Observable<Response> {
    console.log(pessoa.dataNascimento);
    return this._http
      .put(
        this._url,
        pessoa,
        { headers: this._headers }
      );
  }

  public buscarNomeDtNascimento(pessoa: Pessoa): Observable<Pessoa> {
    return this._http
      .post(
        this._url + "buscarNomeDataNascimento",
        pessoa,
        { headers: this._headers }
      ).pipe(
        map(
          res => res.json()
        )
      );
  }
}
