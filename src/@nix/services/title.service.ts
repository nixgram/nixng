import {Injectable, NgZone} from '@angular/core';
import {filter, map, mergeMap} from "rxjs/operators";
import {ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
/**
 * To use this service, you need to add the following code to your app.module.ts file:
 * This service is used to set the page title, you have to inject it to app module via Dependency Injection.
 * like this
 * @example
 * {
 *      providers: [TitleService]
 * }
 * Then you can have to modify to route in your app
 * like this:
 * @example
 * {
 *     path: '',
 *     component: HomeComponent,
 *     data: {
 *         title: 'Home'
 *     }
 * }
 * Lastly, you have to do the following
 * @example
 * {
 *     ...
 *     constructor(private titleService: TitleService) {}
 *     OnInit() {
 *         this.titleService.init();
 *     }
 * }
 * It will set the title of the page to 'Home'.
 *
 * @author sefatanam <https://github.com/sefatanam>
 */
export class TitleService {

    /**
     * Injects the router and the title service to get the title of the current route
     * @param _title
     * @param _router
     * @param _activatedRoute
     * @param _ngZone
     */
    constructor(private _title: Title,
                private _router: Router,
                private _activatedRoute: ActivatedRoute,
                private _ngZone: NgZone) {
    }

    /**
     * It will set title for the page based on the route
     */
    init() {
        this._ngZone.runOutsideAngular(() => {
            this.trackRoutingNavigationStart();
            this.trackErrorRoutingNavigation();
            this.trackRoutingNavigationTitle();
        })

    }

    /**
     * It allows you set custom title for the page
     * @param titleName
     */
    public setCustomTitle = (titleName: string) => this._title.setTitle(titleName);


    /**
     * It will track routing navigation start
     */
    private trackRoutingNavigationStart = () => {
        this._router.events.pipe(filter(event => event instanceof NavigationStart))
            .subscribe(() => this._title.setTitle(environment.navigationLoadingTitle));
    }

    /**
     * It will track routing navigation occurs error
     */
    private trackErrorRoutingNavigation = () => {
        this._router.events
            .pipe(filter(event => event instanceof NavigationError))
            .subscribe(() => this._title.setTitle(environment.navigationErrorTitle));
    }

    /**
     * It will track routing navigation title based on the route data
     */
    private trackRoutingNavigationTitle = () => {
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
            this._title.setTitle(data['title'] || environment.defaultTitle);
        })
    }
}
