import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CompaniesService, UsersService } from '@/_services';
import { Company } from '@/_models/company-model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {
  submitted = false;
  title = 'Novo registro';
  form: FormGroup;
  company: Company;
  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private service: CompaniesService,
    public userService: UsersService,
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
    // este serviço é pra preencher o select
    this.userService.getAll().subscribe();
    if (this.company.id) this.title = 'Atualização de registro';
    this.form = this.fb.group({
      id: [this.company.id],
      name: [this.company.name, Validators.required],
      user_id: [this.company.user_id, Validators.required]
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
