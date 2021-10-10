import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from "./logout.component";
import { IRoute } from "@core/interfaces";

const routes: IRoute[] = [
  {path: '', component: LogoutComponent, data: {title: 'Logout'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogoutRoutingModule {
}
