import { Injectable, NgZone } from '@angular/core';
import { filter, map, mergeMap } from "rxjs/operators";
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private _title$: BehaviorSubject<string> = new BehaviorSubject<string>("My App");

  constructor(private _title: Title,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _ngZone: NgZone) {
  }

  get currentTitle() {
    return this._title$;
  }

  init() {
    this._ngZone.runOutsideAngular(() => {
      this.trackRoutingNavigationStart();
      this.trackRoutingNavigationEnd();
      this.trackRoutingNavigationTitle();
    })

  }

  public setCustomTitle = (titleName: string) => this._title.setTitle(titleName);


  private trackRoutingNavigationStart = () => {
    this._router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this._title$.next('Loading...');
        this._title.setTitle('Loading...')
      });
  }


  // TODO : NavigationEnd will be added for future purpose
  private trackRoutingNavigationEnd = () => {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationError))
      .subscribe(() => {
        this._title$.next('An Error Occurred');
        this._title.setTitle("An Error Occurred");
      });
  }

  private trackRoutingNavigationTitle = () => {
    const appCurrentTitle = this._title.getTitle();
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this._activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap((route) => route?.data),
    ).subscribe((data) => {
      this._title$.next(data?.title );
      this._title.setTitle(data?.title || appCurrentTitle);
    })
  }
}
