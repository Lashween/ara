import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { ViewOrderListComponent } from './view-order-list/view-order-list.component';

const routes: Routes = [
  { path: 'order-list', component: ViewOrderListComponent },
  { path: 'case/:id', component: CaseDetailsComponent },
  { path: '**', redirectTo: 'order-list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechanicRoutingModule { }
