import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { TokenService, AuthenticationService } from '@/_services';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService as NgxToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;
  error = '' ;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: NgxToastrService,
  ) { }

  ngOnInit() {
    if (!this.tokenService.isExpired()) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    //this.loading = true;
    //this.spinner.show();
    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.loading = false;
        },
        error => {
          this.error = error.error;
          this.toastr.error(this.error || error);
          this.loading = false;
          //this.spinner.hide();
        }
      );
}


}
