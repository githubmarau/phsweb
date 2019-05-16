import { Role } from './_models/role-model';

export const adminLteConf = {
  skin: 'blue',
  // isSidebarLeftCollapsed: false,
  // isSidebarLeftExpandOnOver: false,
  // isSidebarLeftMouseOver: false,
  // isSidebarLeftMini: true,
  // sidebarRightSkin: 'dark',
  // isSidebarRightCollapsed: true,
  // isSidebarRightOverContent: true,
  // layout: 'normal',
  sidebarLeftMenu: [
    {label: 'MAIN NAVIGATION', separator: true},
    {label: 'Home', route: '/', iconClasses: 'fa fa-dashboard', pullRights: [{text: 'New', classes: 'label pull-right bg-green'}]},
    {label: 'Dashboard', route: 'dashboard', iconClasses: 'fa fa-dashboard'},
    {label: 'Usuários', route: 'users', iconClasses: 'fa fa-users', can: Role.Admin},
    {label: 'Empresas', route: 'companies', iconClasses: 'fa fa-institution', can: Role.Admin},
    {label: 'Lojas', route: 'stores', iconClasses: 'fa fa-institution', can: Role.Admin},
    // {label: 'Layout', iconClasses: 'fa fa-th-list', children: [
    //   {label: 'Configuration', route: 'layout/configuration'},
    //   {label: 'Custom', route: 'layout/custom'},
    //   {label: 'Header', route: 'layout/header'},
    //   {label: 'Sidebar Left', route: 'layout/sidebar-left'},
    //   {label: 'Sidebar Right', route: 'layout/sidebar-right'},
    //   {label: 'Content', route: 'layout/content'}
    // ]},
    // {label: 'COMPONENTS', separator: true},
    // {label: 'Accordion', route: 'accordion', iconClasses: 'fa fa-tasks'},
    // {label: 'Alert', route: 'alert', iconClasses: 'fa fa-exclamation-triangle'},
    // {label: 'Boxs', iconClasses: 'fa fa-files-o', children: [
    //   {label: 'Default Box', route: 'boxs/box'},
    //   {label: 'Info Box', route: 'boxs/info-box'},
    //   {label: 'Small Box', route: 'boxs/small-box'}
    // ]},
    // {label: 'Dropdown', route: 'dropdown', iconClasses: 'fa fa-arrows-v'},
    // {label: 'Form', iconClasses: 'fa fa-files-o', children: [
    //   {label: 'Input Text', route: 'form/input-text'}
    // ]},
    // {label: 'Tabs', route: 'tabs', iconClasses: 'fa fa-th'}
  ]
};
