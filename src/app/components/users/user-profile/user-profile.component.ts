import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '@/_services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserPasswordComponent } from '../user-password/user-password.component';
import { User } from '@/_models/user-model';
import { Company } from '@/_models/company-model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  showUsers=false;
  bsModalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    initialState: {}
  };

  constructor(
    private service: UsersService,
    private route: ActivatedRoute,
    private bsModalService: BsModalService,
  ) { }

  ngOnInit(): void{
    // let user = this.route.snapshot.data['user'];
    let userId = this.route.snapshot.params['id'];
    //console.log('userId', userId);
    this.service.getProfile(userId).subscribe();
  }

  ngOnDestroy(): void{
    this.service.stores = [];
  }

  onChangePassword(user: User) {
    this.config.initialState = {
      user: user
    }
    this.bsModalRef = this.bsModalService.show(UserPasswordComponent, this.config);
    this.bsModalRef.content.event.subscribe(e => {
      if (e.result == 'OK') {}
    });
  }

  isSelected(id: Number) {
    return id === parseInt(localStorage.getItem('sId'));
  }

  onSelectCompany(data: Company){
    console.log('Empresa', data);
    this.service.stores = data.stores;
  }

  onSelectStore(data: any){
    localStorage.setItem('sId', data.id.toString());
    localStorage.setItem('sNm', data.name);
  }




}
