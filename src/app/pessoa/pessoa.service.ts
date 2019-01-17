import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Response } from "@angular/http/src/static_response";
import { Observable } from 'rxjs';
import { Plataforma } from '../util/plataforma.config';
import { Pessoa } from './pessoa';


@Injectable()
export class PessoaService {

    constructor(private _http: HttpClient) {
        this._http = this._http
    }

    public salvar(pessoa: Pessoa): Observable<Pessoa> {
        return this._http.post<Pessoa>(Plataforma.url + 'pessoa/', pessoa);
    }

    public listar(): Observable<Pessoa[]> {
        return this._http.get<Pessoa[]>(Plataforma.url + 'pessoa/');
    };

    public getPessoa(idPessoa: number): Observable<Pessoa> {
        return this._http.get<Pessoa>(Plataforma.url + 'pessoa/' + idPessoa);
    }

    public remover(pessoa: Pessoa): Observable<Response> {
        return this._http.delete<Response>(Plataforma.url + 'pessoa/' + pessoa.idPessoa);
    }

    public atualizar(pessoa: Pessoa): Observable<Response> {
        return this._http.put<Response>(Plataforma.url + 'pessoa/', pessoa);
    }

    public buscarNomeDtNascimento(pessoa: Pessoa): Observable<Pessoa> {
        return this._http.post<Pessoa>(Plataforma.url + 'pessoa/' + "buscarNome", pessoa);
    }
}