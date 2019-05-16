import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { NgChartPieComponent } from './ng-chart-pie/ng-chart-pie.component';
import { NgChartBarComponent } from './ng-chart-bar/ng-chart-bar.component';

@NgModule({
  declarations: [NgChartPieComponent, NgChartBarComponent],
  exports: [NgChartPieComponent, NgChartBarComponent],
  imports: [
    CommonModule,
    ChartsModule
  ]
})
export class NgChartsModule { }
