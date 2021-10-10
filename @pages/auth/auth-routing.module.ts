import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IRoute } from "@core/interfaces";

const routes: IRoute[] = [
  {
    path: 'logout', loadChildren: () => import('./logout/logout.module').then(m => m.LogoutModule), pathMatch: 'full',
  },
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), pathMatch: 'full'
  }, {}, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
