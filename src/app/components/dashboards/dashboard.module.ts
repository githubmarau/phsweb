import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BoxModule, BoxSmallModule, BoxInfoModule } from "angular-admin-lte";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardBoxesComponent } from "./dashboard-boxes/dashboard-boxes.component";
import { NgChartsModule } from "../shared/ng-charts/ng-charts.module";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardBoxesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    DashboardRoutingModule,
    BoxInfoModule,
    BoxModule
  ]
})
export class DashboardModule {}
