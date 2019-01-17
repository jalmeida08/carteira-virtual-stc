import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinanciamentoBancario } from './financiamento-bancario';
import { HttpClient } from '@angular/common/http';
import { Plataforma } from '../util/plataforma.config';

@Injectable()
export class FinanciamentoBancarioService {

    constructor(private _http: HttpClient) {
        this._http = _http;
    }

    public listarFinanciamentoBancario(): Observable<FinanciamentoBancario[]> {
        return this._http.get<FinanciamentoBancario[]>(Plataforma.url + 'financiamentoBancario/');
    }

    public salvar(financiamentoBancario: FinanciamentoBancario): Observable<Response> {
        return this._http.post<Response>(Plataforma.url + 'financiamentoBancario/', financiamentoBancario);
    }
}