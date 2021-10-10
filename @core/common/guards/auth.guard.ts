import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/states/app.state";
import { skipWhile, take, tap } from "rxjs/operators";
import { TitleService } from "@core/common/services/title.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>,
              private router: Router,
              private titleService: TitleService) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(s => s.auth.isLoggedIn).pipe(
      skipWhile(value => value === null),
      take(1),
      tap(authenticated => {
        if (!authenticated) {
          this.titleService.setCustomTitle("Unauthorized Action")
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    )
  }


}
