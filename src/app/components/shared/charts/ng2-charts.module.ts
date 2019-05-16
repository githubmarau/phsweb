import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { ChartBarComponent } from './chart-bar/chart-bar.component';

@NgModule({
  declarations: [ChartPieComponent, ChartBarComponent],
  exports: [ChartPieComponent, ChartBarComponent],
  imports: [
    CommonModule,
  ]
})
export class Ng2ChartsModule { }
