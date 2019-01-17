import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario/usuario';
import { Plataforma } from '../util/plataforma.config';
import { UsuarioLogado } from './usuario-logado';

@Injectable()
export class LoginService {

    constructor(private _http: HttpClient) {
        this._http = _http;
    }

    public login(usuario: Usuario): Observable<UsuarioLogado> {
        return this._http.post<UsuarioLogado>(Plataforma.url + 'usuario/login', usuario);
    }
}