import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    constructor(private _cookieService: CookieService, private _router: Router) {
        this._cookieService = _cookieService;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        if (this._cookieService.get('utk')) {
            const dupReq = req.clone({
                headers: (
                    req.headers.set('Content-Type', 'application/json'),
                    req.headers.set('Authentication', this._cookieService.get('utk'))
                )
            });
            return next.handle(dupReq);
        } else if (req.url.indexOf('/usuario/login') > 0) {
            const dupReq = req.clone({
                headers: (
                    req.headers.set('Content-Type', 'application/json')
                )
            });
            return next.handle(dupReq);
        } else {
            this._router.navigate(['']);
        }
    }

}