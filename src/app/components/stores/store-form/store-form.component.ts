import { Component, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@/_models/store-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StoresService, UsersService, CompaniesService } from '@/_services';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css']
})
export class StoreFormComponent implements OnInit {
  form: FormGroup;
  title = 'Novo registro';
  store: Store;
  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private service: StoresService,
    private companiesService: CompaniesService,
    private bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
    this.companiesService.getAll().subscribe();
    if (this.store.id) this.title = 'Atualização de registro';
    this.form = this.fb.group({
      id: [this.store.id],
      name: [this.store.name, Validators.required],
      company_id: [this.store.company_id, Validators.required],
      driver: [this.store.driver, Validators.required],
      host: [this.store.host, Validators.required],
      port: [this.store.port, Validators.required],
      database: [this.store.database, Validators.required],
      username: [this.store.username, Validators.required],
      password: [this.store.password, Validators.required],
      charset: [this.store.charset, Validators.required],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
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
