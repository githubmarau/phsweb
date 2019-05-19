import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild} from '@angular/core';
import * as Prism from 'prismjs';
import { UsersService } from '@/_services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserPasswordComponent } from '../user-password/user-password.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmComponent } from '@/components/shared/confirm/confirm.component';
import { User } from '@/_models/user-model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit{
  titleUsers = 'Lista de Usuários';
  bsModalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    initialState: {}
  };

  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    public service: UsersService,
    private bsModalService: BsModalService,
    ) { }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      displayLength: 10,
      lengthMenu: [[10, 25, 50, 75, -1], [10, 25, 50, 75, "Tudo"]],
      dom: 'Blfrtip',
      // Configure the buttons
      buttons: [
//        'columnsToggle',
//        'colvis',
        'copy',
        'print',
        'excel',
        // {
        //   text: 'Some button',
        //   key: '1',
        //   action: function (e, dt, node, config) {
        //     alert('Button activated');
        //   }
        // }
      ],
      language: {
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "_MENU_ resultados por página",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro encontrado",
        "sSearch": "Pesquisar",
        "oPaginate": {
            "sNext": "Próximo",
            "sPrevious": "Anterior",
            "sFirst": "Primeiro",
            "sLast": "Último"
        },
        "oAria": {
            "sSortAscending": ": Ordenar colunas de forma ascendente",
            "sSortDescending": ": Ordenar colunas de forma descendente"
        }
    }
      //paginationType: "full_numbers",
      // data: this.service.list,
      // columns: [
      //   {title: 'Ativo', data: 'active'},
      //   {title: 'Nome', data: 'FullName'},
      //   {title: 'Email', data: 'email' },
      //   {title: 'Papel', data: 'role' },
      //   {title: 'Conectado', data: 'connected' }
      // ]
    };
    this.service.getAll().subscribe(() => {
      this.rerender();
    });
  }


  onCreate(){
    this.config.initialState = {
      user: new User()
    }
    this.bsModalRef = this.bsModalService.show(UserFormComponent, this.config);
    this.bsModalRef.content.event.subscribe(e => {
      if(e.result == 'OK') {
        this.rerender();
        //this.dtOptions.data = this.service.list;
      }
    });
  }

  onEdit(user: User){
    this.config.initialState = {
      user: user
    }
    this.bsModalRef = this.bsModalService.show(UserFormComponent, this.config);
    this.bsModalRef.content.event.subscribe(e => {
      if(e.result == 'OK') {
        this.rerender();
      }
    });
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

  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
    this.dtTrigger.next();
  }

  onDelete(user: User) {
    let modalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-sm"
    };

    let config = {
      title: 'Usuário: ' + user.FullName,
      message: 'Quer realmente deletar este registro?',
      btnConfirm: 'Sim',
      btnDecline: 'Não deletar'
    };

    this.bsModalRef = this.bsModalService.show(ConfirmComponent, modalOptions);
    this.bsModalRef.content.config = config;
    this.bsModalRef.content.event.subscribe(e => {
      if (e.result == "yes"){
        this.service.delete(user.id).subscribe(() => {
          this.rerender();
        });
      }
    });
  }
}
