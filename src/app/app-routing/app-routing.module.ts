import { NgModule } from '@angular/core';
import {ReportsComponent} from "../reports/reports.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'reports', component: ReportsComponent}
];


@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
