import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '@/_services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  constructor(
    private service: CompaniesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
//    let data = this.route.snapshot.data['company'];
    let companyId = this.route.snapshot.params['id'];
    this.service.getDetails(companyId).subscribe();
  }

  onSelect(data: any){
    localStorage.setItem('sId', data.id);
    localStorage.setItem('sNm', data.name);
  }

  isSelected(id: Number) {
    return id === parseInt(localStorage.getItem('sId'));
  }

}
