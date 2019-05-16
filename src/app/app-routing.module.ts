import { AuthGuard } from './_guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Role } from './_models/role-model';

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], data: {title: 'Home'},
    children: [
      {path: '', component: HomeComponent},
      {path: 'dashboard', canActivateChild: [AuthGuard],
        loadChildren: './components/dashboards/dashboard.module#DashboardModule',
        data: {title: 'Dashboard'}
      },
      {path: 'users', canActivateChild: [AuthGuard],
        loadChildren: './components/users/users.module#UsersModule',
        data: {title: 'Usuários', roles: [Role.Admin]}
      },
      {path: 'companies', canActivateChild: [AuthGuard],
        loadChildren: './components/companies/companies.module#CompaniesModule',
        data: {title: 'Empresas', roles: [Role.Admin]}
      },
      {path: 'stores', canActivateChild: [AuthGuard],
        loadChildren: './components/stores/stores.module#StoresModule',
        data: {title: 'Lojas', roles: [Role.Admin]}
      },
    ],
  },
  {path: 'login',
    loadChildren: './login/login.module#LoginModule',
    data: {customLayout: true}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { useHash: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
