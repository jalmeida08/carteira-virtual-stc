import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { InstituicaoFinanceira } from './instituicao-financeira';
import { HttpClient } from '@angular/common/http';
import { Plataforma } from '../util/plataforma.config';

@Injectable()
export class InstituicaoFinanceiraService {

    constructor(private _http: HttpClient) {
        this._http = _http;
    }

    public listarInstituicoesFinanceiras(): Observable<InstituicaoFinanceira> {
        return this._http.get<InstituicaoFinanceira>(Plataforma.url + 'instituicoesFinanceiras');
    }

    public salvar(instituicaoFinanceira: InstituicaoFinanceira): Observable<Response> {
        return this._http.post<Response>(Plataforma.url + 'instituicoesFinanceiras', instituicaoFinanceira);
    }

}