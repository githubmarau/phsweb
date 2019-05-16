import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ng-chart-pie',
  templateUrl: './ng-chart-pie.component.html',
  styleUrls: ['./ng-chart-pie.component.css']
})
export class NgChartPieComponent implements OnInit {
  @Input('chartData') pieChart: any;

  constructor() { }

  ngOnInit() {
    console.log('pieChart', this.pieChart);
  }
}
