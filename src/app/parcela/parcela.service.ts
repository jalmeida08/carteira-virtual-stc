import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Parcela } from './parcela';
import { HttpClient } from '@angular/common/http';
import { Plataforma } from '../util/plataforma.config';

@Injectable()
export class ParcelaService {

    constructor(private _http: HttpClient) {
        this._http = _http;
    }

    public fecharParcela(parcela: Parcela): Observable<Response> {
        return this._http.put<Response>(Plataforma.url + 'parcela/pagarParcela', parcela);
    }

    public abrirParcela(parcela: Parcela): Observable<Response> {
        return this._http.put<Response>(Plataforma.url + 'parcela/abrirParcela', parcela);
    }
}