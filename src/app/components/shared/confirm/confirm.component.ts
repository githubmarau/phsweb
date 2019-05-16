import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  event: EventEmitter<any> = new EventEmitter();
  config: any = {
    title: '',
    message: '',
    btnConfirm: 'Yes',
    btnDecline: 'No'
  };

  constructor(private modalRef: BsModalRef) {}

  confirm(): void {
    this.event.emit({result: 'yes'});
    this.modalRef.hide();
  }

  decline(): void {
    this.event.emit({result: 'no'});
    this.modalRef.hide();
  }
}
