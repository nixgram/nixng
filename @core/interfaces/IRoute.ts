import { Route } from "@angular/router";

interface RouteExternalData {
  title: string;
}

export interface IRoute extends Route {
  data?: RouteExternalData
}
