import { Injectable } from '@angular/core';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

export class HeaderToken {

    constructor(
        private _cookieService: CookieService,
        private _headers: Headers
    ) {
        this._cookieService = _cookieService;
        this._headers = _headers
    }

    public construirHeader(): Headers {
        this._headers = new Headers({ 'Content-Type': 'application/json' });
        this._headers.append('Authentication', this._cookieService.get('utk'));
        return this._headers;
    }

}