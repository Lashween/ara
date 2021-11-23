import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: 'feedback',
    loadChildren: () =>
      import('./feedback/feedback.module').then((m) => m.FeedbackModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('./bookings/bookings.module').then((m) => m.BookingsModule),
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
