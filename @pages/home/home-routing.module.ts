import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IRoute } from "@core/interfaces";
import { HomeComponent } from "../home/home.component";

const routes: IRoute[] = [{
  path: '',
  component: HomeComponent,
  data: {title: 'Home'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
