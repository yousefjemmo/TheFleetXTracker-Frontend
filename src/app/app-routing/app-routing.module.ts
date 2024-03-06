import { NgModule } from '@angular/core';
import {ReportsComponent} from "../reports/reports.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {path: 'reports', component: ReportsComponent}
];


@NgModule({
imports: [RouterModule.forRoot(routes), FormsModule],
exports: [RouterModule]
})
export class AppRoutingModule { }
