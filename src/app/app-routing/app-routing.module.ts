import { NgModule } from '@angular/core';
import {ReportsComponent} from "../reports/reports.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AddVehicleFormComponent} from "../add-vehicle-form/add-vehicle-form.component";

const routes: Routes = [
  {path: 'reports', component: ReportsComponent},
  {path: 'add-vehicle-form', component: AddVehicleFormComponent}
];


@NgModule({
imports: [RouterModule.forRoot(routes), FormsModule],
exports: [RouterModule]
})
export class AppRoutingModule { }
