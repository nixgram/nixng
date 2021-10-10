import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "./login.component";
import { IRoute } from "@core/interfaces";

const routes: IRoute[] = [{path: '', component: LoginComponent, data: {title: 'Login'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
