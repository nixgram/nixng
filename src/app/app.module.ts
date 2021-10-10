import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "src/app/app-routing.module";
import { AppComponent } from "src/app/app.component";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgRxDevToolModules } from "@core/store";
import { BonikBazaarReducers } from "@core/store/reducers";
import { BonikBazaarEffects } from "@core/store/effects";
import { AuthService } from "@core/services/auth.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "@core/interceptors/auth.interceptor";
import { TitleService } from "@core/common/services/title.service";
import { LoaderService } from "@core/common/services/loader.service";
import {NavBarModule} from "@shared/components/nav-bar/nav-bar.module";


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot(BonikBazaarReducers),
        NgRxDevToolModules,
        EffectsModule.forRoot(BonikBazaarEffects),
        NavBarModule
    ],
  providers: [TitleService, LoaderService, AuthService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
