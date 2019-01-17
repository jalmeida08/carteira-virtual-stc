import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Despesa } from './despesa';
import { HttpClient } from '@angular/common/http';
import { Plataforma } from '../util/plataforma.config';

@Injectable()
export class DespesaService {

    constructor(private _http: HttpClient) {
        this._http = _http;
    }

    public listarDespesas(): Observable<Despesa[]> {
        return this._http.get<Despesa[]>(Plataforma.url + `despesa/buscarDespesasUsuario/`);
    }

    public salvar(despesa: Despesa): Observable<Response> {
        return this._http.post<Response>(Plataforma.url + 'despesa/', despesa);
    }

    public getDespesa(idUsuario:number): Observable<Despesa> {
        return this._http.get<Despesa>(Plataforma.url + `despesa/buscarDespesa/${idUsuario}/`);
    }

    public pagarDespesa(idUsuario: number, dataPagamento: string): Observable<Response> {
        return this._http.get<Response>(Plataforma.url + `despesa/pagarDespesa/${dataPagamento}`);
    }
}