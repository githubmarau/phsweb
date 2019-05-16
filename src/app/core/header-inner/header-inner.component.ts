import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { User } from '@/_models/user-model';

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})
export class HeaderInnerComponent implements OnInit, OnDestroy {
  private currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) {}
  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }
  ngOnDestroy(): void {

  }
  onLogout(){
    console.log('logout');
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
