import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompaniesService } from '@/_services';
import { ConfirmComponent } from '@/components/shared/confirm/confirm.component';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { Company } from '@/_models/company-model';
import * as Prism from 'prismjs';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit, OnDestroy, AfterViewInit {

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
    public service: CompaniesService,
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
      company: new Company()
    }
    this.bsModalRef = this.bsModalService.show(CompanyFormComponent, this.config);
    this.bsModalRef.content.event.subscribe(e => {
      if(e.result == 'OK') {
        this.rerender();
      }
    });
  }

  onEdit(company: Company){
    console.log('companyEdit', company);
    this.config.initialState = {
      company: company
    }
    this.bsModalRef = this.bsModalService.show(CompanyFormComponent, this.config);
    this.bsModalRef.content.event.subscribe(e => {
      if(e.result == 'OK') {
        this.rerender();
      }
    });
  }

  onDelete(company: Company) {
    let modalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: "modal-sm"
    };

    let config = {
      title: 'Empresa: ' + company.name,
      message: 'Quer realmente deletar este registro?',
      btnConfirm: 'Sim',
      btnDecline: 'Não deletar'
    };

    this.bsModalRef = this.bsModalService.show(ConfirmComponent, modalOptions);
    this.bsModalRef.content.config = config;
    this.bsModalRef.content.event.subscribe(e => {
      if (e.result == "yes"){
        this.service.delete(company.id).subscribe(() => {
          this.rerender();
        });
      }
    });
  }
}
