import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestAssistanceComponent } from './request-assistance/request-assistance.component';
import { WorkshopsComponent } from './workshops/workshops.component';

const routes: Routes = [
  { path: 'request', component: RequestAssistanceComponent },
  { path: 'workshops', component: WorkshopsComponent },
  { path: '**', redirectTo: 'request' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule { }
