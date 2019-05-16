import { Component, OnInit, Input } from '@angular/core';
import { Chart, PositionType, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {
  @Input() data: number[] = [50, 40, 80, 60, 90, 100, 10];
  @Input() labels: string[] = ['A','B','C','D','E','F','G'];
  @Input() theme = "light2";
  @Input() animation: boolean = false;
  @Input() exportable: boolean = false;
  @Input() title: string = '';
  chart: any;
  backgroundColors: ['#4dc9f6','#f67019','#f53794',
  '#537bc4','#acc236','#166a8f','#00a950'];

  constructor() { }

  ngOnInit() {

    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        datasets: [{
          data: this.data,
          backgroundColor: this.backgroundColors,
          label: this.title
        }],
        labels: this.labels,
      },
      options: {
        responsive: true
      }
    });

  }

}
