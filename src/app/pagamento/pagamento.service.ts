import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { Pagamento } from './pagamento';
import { map } from 'rxjs/operators';
import { Pessoa } from '../pessoa/pessoa';

@Injectable()
export class PagamentoService {
    
    private _url: string = "http://localhost:8080/carteiravirtual/resources/pagamento";
    private _headers: Headers;

    constructor(
        private _http: Http,
    ) {
        this._http = _http;
    }

    public salvar(pagamento: Pagamento): Observable<Response> {
        return this._http
            .post(
                this._url,
                pagamento,
                { headers: this._headers }
            );
    }
}