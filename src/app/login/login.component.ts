import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Usuario } from '../usuario/usuario';
import { Router } from '@angular/router';
import { UsuarioLogado } from './usuario-logado';
import { Mensagem } from '../alerta/mensagem';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public usuario: Usuario = new Usuario();
    public mensagens: Mensagem[] = new Array<Mensagem>();

    constructor(
        private _loginService: LoginService,
        private _cookieService: CookieService,
        private _router: Router,
    ) {
        this._loginService = _loginService;
    }

    public alerta(
        mensagem: string,
        tipoMensagem: string,
        mensagemDesaque: string) {
        this.mensagens.push(
            {
                mensagem: mensagem,
                tipoMensagem: tipoMensagem,
                mensagemDesaque: mensagemDesaque
            }
        );
    }

    public logar() {
        this._loginService
            .login(this.usuario)
            .subscribe((res: UsuarioLogado) => {
                this._cookieService.set('utk', res.token);
                this._router.navigate(['/pessoa']);
            }, error => {
                this.alerta("E-mail ou senha estão incorretos", "danger", "Erro! ");
            });
    }

    ngOnInit(): void { this.usuario.email = 'jefferson08jsa@hotmail.com', this.usuario.senha = '123123' }
}
