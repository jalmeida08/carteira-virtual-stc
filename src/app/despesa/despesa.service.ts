import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Despesa } from './despesa';

@Injectable()
export class DespesaService {

    private _url: string = "http://localhost:8081/carteiravirtual/resources/despesa/";
    private _headers: Headers;

    constructor(
        private _http: Http,
    ) {
        this._http = _http;
    }

    public listarDespesas(): Observable<Despesa[]> {
        return this._http
            .get(this._url)
            .pipe(
                map(res => res.json())
            );
    }

    public salvar(despesa: Despesa): Observable<Response> {
        return this._http
            .post(
                this._url,
                despesa,
                { headers: this._headers }
            );
    }

    public getDespesa(idDespesa: number): Observable<Despesa> {
        return this._http
            .get(
                this._url + idDespesa)
            .pipe(
                map(res => res.json())
            );
    }
}