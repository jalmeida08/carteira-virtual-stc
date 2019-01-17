import { Injectable } from '@angular/core';
import { Usuario } from '../usuario/usuario';
import { BehaviorSubject } from 'rxjs';
import { Observable, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioLogado } from '../login/usuario-logado';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class DataService {

    constructor(
        private _router: Router,
        private _cookieService: CookieService
    ){
        this._cookieService = _cookieService;
        //console.log("DATA SERVICE");
        //this.usuario.email = "teste@teste.com";
    }

    public usuarioLogado: UsuarioLogado = new UsuarioLogado();

    public menssageSource = new BehaviorSubject(this.usuarioLogado);
    currentMessage = this.menssageSource.asObservable();

    public registrarSessao(usuarioLogado: UsuarioLogado): void{
        this._cookieService.set('utk', usuarioLogado.token);
    }

    public capturarSessao(): string {
        return this._cookieService.get('utk');
    }

    public usuarioNaoAutorizado(){
        if(this._cookieService.check('utk')){
            this._router.navigate(['']);
            return;
        }
    }
}