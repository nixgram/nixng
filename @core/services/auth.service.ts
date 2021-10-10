import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { ILoginRequest, IUserInfo } from "@core/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(credentials: ILoginRequest): Observable<IUserInfo | Error> {

    let temp: IUserInfo = {
      aud: "",
      email: "",
      exp: "",
      iss: "",
      jti: "",
      organizationId: "",
      organizationName: "",
      photoUrl: "",
      roleId: "",
      roleName: "",
      userId: "",
      userName: ""
    }
    return of(temp);

    /* return this.http.post<ILoginResponse>('connect/token', credentials).pipe(
       map((response: ILoginResponse) => {
         this.store.dispatch({type: AuthActionTypes.STORE_TOKEN, payload: response});
         return this.decodeJwtToken(response.token);
       }),
       catchError((err: Error) => of(new Error(err.message)))
     );*/
  }


  /**
   * Decode jwt token without using library , source : Stackoverflow
   * @param token
   */
  decodeJwtToken(token: string): IUserInfo {
    if (!token) {
      throw new Error('Invalid decode request');
    }
    let base64Url = token.split('.')[1];
    let base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  /*isUsernameExist(name: string): Observable<boolean> {
    return this.http.get<boolean>('account/IsUserNameExist', {
      params: {
        username: name
      }
    }).pipe(
      delay(2000),
      map((data) => {
        return !!data;
      }),
      catchError(err => throwError("Request failed. Reason is ", err))
    )
  }*/


  logout() {
    return of(true)
  }
}
