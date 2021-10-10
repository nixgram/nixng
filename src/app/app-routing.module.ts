import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IRoute } from "@core/interfaces";
import { AuthGuard } from "@core/common/guards/auth.guard";

const routes: IRoute[] = [
  {
    path: 'auth',
    loadChildren: () => import('../../@pages/auth/auth.module').then(m => m.AuthModule),

  }, {
    path: 'home',
    loadChildren: () => import('../../@pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
