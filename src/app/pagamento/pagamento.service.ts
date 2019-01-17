import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Pagamento } from './pagamento';
import { HttpClient } from '@angular/common/http';
import { Plataforma } from '../util/plataforma.config';

@Injectable()
export class PagamentoService {

    constructor(private _http: HttpClient) {
        this._http = _http;
    }

    public salvar(pagamento: Pagamento): Observable<Response> {
        return this._http.post<Response>(Plataforma.url + `pagamento`, pagamento);
    }

    public listarPagamentos(): Observable<Pagamento[]> {
        return this._http.get<Pagamento[]>(Plataforma.url + `pagamento/buscarPagamentosUsuario`);
    }

    public getPagamento(idPagamento: number): Observable<Pagamento> {
        return this._http.get<Pagamento>(Plataforma.url + `pagamento/buscarPagamento/${idPagamento}`);
    }

    public atualizar(pagamento: Pagamento): Observable<Response> {
        return this._http.put<Response>(Plataforma.url + `pagamento`, pagamento);
    }

    public remover(idPagamento: number): Observable<Response> {
        return this._http.delete<Response>(Plataforma.url + `pagamento/remover/${idPagamento}`);
    }

    public fecharPagamento(idPagamento: number): Observable<Response> {
        return this._http.get<Response>(Plataforma.url + `pagamento/fecharPagamento/${idPagamento}`);
    }

    public abrirPagamento(idPagamento: number): Observable<Response> {
        return this._http.get<Response>(Plataforma.url + `pagamento/abrirPagamento/${idPagamento}`);
    }

    public pagametosDoMes(): Observable<Pagamento[]> {
        return this._http.get<Pagamento[]>(Plataforma.url + `pagamento/pagametosDoMes`);
    }

}