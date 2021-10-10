import { Component, NgZone, OnInit } from '@angular/core';
import { TitleService } from "@core/common/services/title.service";
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/states/app.state";
import { AuthActionTypes } from "@core/store/types/AuthActionTypes";
import { Observable } from "rxjs";
import { LoaderService } from "@core/common/services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-app';

  title$!: Observable<string>;
  isLoggedIn$!: Observable<boolean>;
  loading$!: Observable<boolean>;

  constructor(private _titleService: TitleService,
              private _loaderService: LoaderService,
              private store: Store<AppState>,
              private _ngZone: NgZone) {
  }


  async ngOnInit() {
    await this._titleService.init();

    await this._ngZone.runOutsideAngular(() => {
      this.title$ = this._titleService.currentTitle;
      this.loading$ = this._loaderService.visible;
      this.isLoggedIn$ = this.store.select(s => s.auth.isLoggedIn);
    });

  }

  // TODO : can be removed
  onLogoutClick = () => this.store.dispatch({type: AuthActionTypes.LOADING_LOGOUT});

}
