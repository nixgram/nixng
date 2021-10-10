import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "@core/services/auth.service";
import { AuthActionTypes } from "@core/store/types/AuthActionTypes";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { IUserInfo } from "@core/interfaces/IUserInfo";

@Injectable()
export class AuthEffect {

  loadingLogin$ = createEffect(() => {
    return this.ngZone.runOutsideAngular(() => {
      return this.action$.pipe(
        ofType(AuthActionTypes.LOADING_LOGIN),
        mergeMap(({payload}) => this.service.login(payload).pipe(
          map((response: IUserInfo | Error) => {

            if (response instanceof Error) {
              return ({type: AuthActionTypes.LOADING_LOGIN_FAILED, payload: response.message});
            }
            this.router.navigate(['/']);
            return ({type: AuthActionTypes.LOADING_LOGIN_SUCCESS, payload: response});

          }),
          catchError(err => of({type: AuthActionTypes.LOADING_LOGIN_FAILED, payload: err}))
        ))
      )
    });

  });


  loadingLogout = createEffect(() => {
    return this.ngZone.runOutsideAngular(() => {
      return this.action$.pipe(
        ofType(AuthActionTypes.LOADING_LOGOUT),
        mergeMap(() => this.service.logout().pipe(
          map((response: boolean) => {
            // TODO : Rest of functionality will be added after server connection
            if (response) {
              this.router.navigate(['/auth/logout'])
              return ({type: AuthActionTypes.LOADING_LOGOUT_SUCCESS});
            }
            return ({type: AuthActionTypes.LOADING_LOGOUT_FAILED, payload: response});
          }),
          catchError(err => of({type: AuthActionTypes.LOADING_LOGOUT_FAILED, payload: err}))
        ))
      )
    });

  })

  constructor(private action$: Actions,
              private service: AuthService,
              private router: Router,
              private ngZone: NgZone) {
  }
}
