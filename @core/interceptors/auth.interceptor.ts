import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/states/app.state";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private jwtToken = '';

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {BaseUrlLogin, baseUrl, TokenEndPoint} = environment;

    this.store.select(store => store.auth.credentials?.token)
      .subscribe(data => this.jwtToken = data ?? '');

    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + this.jwtToken),
      url: request.url.toString().toLowerCase() !== TokenEndPoint ? baseUrl.concat(request.url) : BaseUrlLogin.concat(request.url)  // temporary solution
    });
    return next.handle(modifiedReq);
  }
}
