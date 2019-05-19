import { User } from './../../../_models/user-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthenticationService, UsersService } from '@/_services';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {
  submitted = false;
  title = "Mudança de senha";
  user: User;
  form: FormGroup;
  event: EventEmitter<any> = new EventEmitter();

  constructor(
    public authenticate: AuthenticationService,
    private service: UsersService,
    private fb: FormBuilder,
    private bsModalRef: BsModalRef
    ) { }

  ngOnInit() {
    this.title = 'Usuário: ' + this.user.FullName;
    this.form = this.fb.group({
      id: [this.user.id],
      old_password: [null],
      new_password: [null, [Validators.required]],
      password_confirm: [null, [Validators.required]],
    }, {validators: this.checkPasswords});

  }

  // propriedade usada para acesso aos atributos do formulário
  get f() { return this.form.controls; }

  // usado para validar confirmação de senha no formulário
  checkPasswords(fg: FormGroup) {
    let new_password = fg.controls.new_password.value;
    let password_confirm = fg.controls.password_confirm.value;
    return new_password === password_confirm ? null : { notSame: true }
  }

  // submete o formulário
  onSubmit(){
    this.submitted = true;
    if(!this.form.valid){
      return;
    }
    //this.form.controls['id'].setValue(this.userId);
    this.service.updatePassword(this.form.value).subscribe(
      resp => {
        this.event.emit({result: 'OK'});
        this.bsModalRef.hide();
      },
      err => {
        return;
      }
    );
  }

  onClose(){
    this.bsModalRef.hide();
  }
}
