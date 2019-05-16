import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ng-chart-bar',
  templateUrl: './ng-chart-bar.component.html',
  styleUrls: ['./ng-chart-bar.component.css']
})
export class NgChartBarComponent implements OnInit {
  @Input('chartData') barChart: any;

  constructor() { }

  ngOnInit() {
    console.log('barChart', this.barChart);
  }
}
