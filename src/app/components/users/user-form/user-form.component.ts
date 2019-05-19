import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '@/_services';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '@/_models/user-model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  submitted = false;
  title = 'Novo registro';
  form: FormGroup;
  user: User;
  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private bsModalRef: BsModalRef,
    private service: UsersService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {

    if (this.user.id) this.title = 'Atualização de registro';
    //user = user || this.route.snapshot.data['user'];
    this.form = this.fb.group({
      id: [this.user.id],
      active: [this.user.active],
      avatar_url: [this.user.avatar_url],
      first_name: [this.user.first_name, [Validators.required]],
      last_name: [this.user.last_name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role, Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      if (!this.form.get('id').value)
        this.create(this.form.value);
      else
        this.update(this.form.value);
    }
  }

  create(data: any){
    this.service.create(data).subscribe(
      resp => {
        this.event.emit({result: 'OK'});
        this.bsModalRef.hide();
      },
      err => {
        return;
      }
    );
  }

  update(data: any){
    this.service.update(data).subscribe(
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
