import { Injectable } from '@angular/core';
import { Response } from "@angular/http/src/static_response";
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { Plataforma } from '../util/plataforma.config';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private _http: HttpClient) {
        this._http = _http;
    }

    public salvar(usuario: Usuario): Observable<Response> {
        return this._http.post<Response>(Plataforma.url + 'usuario', usuario);
    }

    public listar(): Observable<Usuario[]> {
        return this._http.get<Usuario[]>(Plataforma.url + 'usuario');
    }

    public getUsuario(idUsuario: number): Observable<Usuario> {
        return this._http.get<Usuario>(Plataforma.url + 'usuario/' + idUsuario);
    }

    public remover(usuario: Usuario): Observable<Response> {
        return this._http.delete<Response>(Plataforma.url + 'usuario/' + usuario.idUsuario);
    }

    public atualizar(usuario: Usuario): Observable<Response> {
        return this._http.put<Response>(Plataforma.url + 'usuario', usuario);
    }

}
