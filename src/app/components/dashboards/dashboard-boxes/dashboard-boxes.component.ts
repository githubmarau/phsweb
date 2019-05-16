import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-boxes',
  templateUrl: './dashboard-boxes.component.html',
  styleUrls: ['./dashboard-boxes.component.css']
})
export class DashboardBoxesComponent implements OnInit {
  @Input() infoBoxes: any[];

  constructor() { }

  ngOnInit() {
  }
}
