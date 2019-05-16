import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataTableDirective } from 'angular-datatables';
import * as Prism from 'prismjs';
import { StoresService } from '@/_services';
import { ConfirmComponent } from '@/components/shared/confirm/confirm.component';
import { StoreFormComponent } from '../store-form/store-form.component';
import { Store } from '@/_models/store-model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit, OnDestroy, AfterViewInit {

  //dtOptions: DataTables.Settings = {};
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  bsModalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    initialState: {}
  };

  constructor(
    private service: StoresService,
    private bsModalService: BsModalService,
  ) { }

  ngOnInit() {
    this.dtOptions = {
      displayLength: 10,
      lengthMenu: [[10, 25, 50, 75, -1], [10, 25, 50, 75, "Tudo"]],
      dom: 'Blfrtip',
      // Configure the buttons
      buttons: [
        'copy',
        'print',
        'excel',
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
    };
    this.service.getAll().subscribe(() => {
      this.rerender();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit() {
    Prism.highlightAll();
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  onCreate(){
    this.config.initialState = {
      store: new Store()
    }
    this.bsModalRef = this.bsModalService.show(StoreFormComponent, this.config);
    this.bsModalRef.content.event.subscribe(e => {
      if(e.result == 'OK') {
        this.rerender();
      }
    });
  }

  onEdit(store: Store){
    this.config.initialState = {
      store: store
    }
    this.bsModalRef = this.bsModalService.show(StoreFormComponent, this.config);
    this.bsModalRef.content.event.subscribe(e => {
      if(e.result == 'OK') {
        this.rerender();
      }
    });
  }

  onDelete(store: Store) {
    let modalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-sm"
    };

    let config = {
      title: 'Loja: ' + store.name,
      message: 'Quer realmente deletar este registro?',
      btnConfirm: 'Sim',
      btnDecline: 'Não deletar'
    };

    this.bsModalRef = this.bsModalService.show(ConfirmComponent, modalOptions);
    this.bsModalRef.content.config = config;
    this.bsModalRef.content.event.subscribe(e => {
      if (e.result == "yes"){
        this.service.delete(store.id).subscribe(() => {
          this.rerender();
        });
      }
    });
  }

  onSelect(data: any){
    console.log(data)
    localStorage.setItem('sId', data.id);
    localStorage.setItem('sNm', data.name);
    this.rerender();
  }

  isSelected(id: Number): boolean {
    return id === parseInt(localStorage.getItem('sId'));
  }

}
