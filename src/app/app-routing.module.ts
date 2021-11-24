import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'client',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'mechanic',
    loadChildren: () =>
      import('./mechanic/mechanic.module').then((m) => m.MechanicModule),
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '404', component: AppComponent },
  { path: '**', redirectTo: 'login' }, // { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
