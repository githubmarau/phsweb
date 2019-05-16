import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent, UserListComponent, UserProfileComponent } from '.';
import { UsersResolverGuard } from '@/_guards';
import { UsersProfileResolverGuard } from '@/_guards/users-profile-resolver.guard';


// const routes: Routes = [
//   //{path: '', redirectTo: 'list', pathMatch: 'full'},
//   {path: '', component: UserListComponent},
//   {
//     path: 'edit/:id',
//     data: {title: 'Edição de Usuário',},
//     component: UserEditComponent,
//     resolve: {user: UserResolverGuard}
//   },
//   {
//     path: 'profile/:id',
//     data: {title: 'Perfil de Usuário',},
//     component: UserProfileComponent,
//     resolve: {user: UserResolverGuard}
//   },
//   {
//     path: 'create',
//     data: {title: 'Novo Usuário',},
//     component: UserCreateComponent,
//     resolve: {user: UserResolverGuard}
//   },
// ];

const routes: Routes = [
  {
    path: '',
    data: {title: 'Lista de Usuários',},
    component: UserListComponent
  },
  {
    path: 'profile/:id',
    data: {title: 'Perfil de Usuário',},
    component: UserProfileComponent,
    //resolve: {user: UsersProfileResolverGuard}
  },
  // {
  //   path: 'create',
  //   data: {title: 'Novo Usuário',},
  //   component: UserFormComponent,
  //   //resolve: {user: UsersResolverGuard}
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
