import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LayoutService, LayoutStore } from 'angular-admin-lte';
import * as Prism from 'prismjs';
import { MenuService } from './_services/menu.service';
import { adminLteConf } from './admin-lte.conf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public customLayout: boolean;

  constructor(
    private layoutService: LayoutService,
    private menuService: MenuService,
    private layoutStore: LayoutStore,
  ) {}

  ngOnInit() {
    //this.ngAfterViewInit();
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayout = value;
    });
    // this.menuService.makeMenu(adminLteConf.sidebarLeftMenu)
    // this.layoutStore.setSidebarLeftMenu(this.menuService.menu);
  }

  /**
   * @method ngAfterViewInit
   */
  // ngAfterViewInit() {
  //   Prism.highlightAll();
  // }
}
