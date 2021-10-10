import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  Router
} from "@angular/router";
import { BufferMode } from "@core/common/types";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _value !: BehaviorSubject<number>;
  private _visible!: BehaviorSubject<boolean>;
  private _mode!: BehaviorSubject<string>;
  private _bufferValue!: BehaviorSubject<number>;

  constructor(private router: Router, private ngZone: NgZone) {
    this.init();
  }


  get bufferValue(): Observable<number> {
    return this._bufferValue.asObservable();
  }

  get mode(): Observable<string> {
    return this._mode.asObservable();
  }

  get value(): Observable<number> {
    return this._value.asObservable();
  }

  get visible(): Observable<boolean> {
    return this._visible.asObservable();
  }

  setMode = (value: BufferMode) => this._mode.next(value);

  setBufferValue = (value: number) => this._bufferValue.next(value);

  setValue = (value: number) => this._value.next(value);

  setVisible = (value: boolean) => this._visible.next(value);

  show = () => this._visible.next(true);

  hide = () => this._visible.next(false);

  private init(): void {
    this.ngZone.runOutsideAngular(() => {
      this._bufferValue = new BehaviorSubject(0);
      this._mode = new BehaviorSubject('indeterminate');
      this._value = new BehaviorSubject(0);
      this._visible = new BehaviorSubject<boolean>(true);


      this.router.events
        .pipe(filter((event) =>
          event instanceof NavigationStart
          || event instanceof ResolveStart))
        .subscribe(() => {
          this.show();
        });

      this.router.events
        .pipe(filter((event) =>
          event instanceof NavigationEnd
          || event instanceof NavigationError
          || event instanceof NavigationCancel
          || event instanceof ResolveEnd))
        .subscribe(() => {
          this.hide();
        });
    });

  }

}
