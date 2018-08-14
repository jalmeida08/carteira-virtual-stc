import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { Parcela } from './parcela';

@Injectable()
export class ParcelaService {

    private _url: string = "http://localhost:8081/carteiravirtual/resources/parcela/";
    private _headers: Headers;

    constructor(
        private _http: Http,
    ) {
        this._http = _http;
    }


    public fecharParcela(parcela: Parcela): Observable<Response> {
        return this._http
            .put(
                this._url+"pagarParcela",
                parcela,
                { headers: this._headers }
            );
    }

    public abrirParcela(parcela: Parcela): Observable<Response> {
        return this._http
            .put(
                this._url + "abrirParcela",
                parcela,
                { headers: this._headers }
            );
    }
}