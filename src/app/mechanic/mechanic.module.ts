import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MechanicRoutingModule } from './mechanic-routing.module';
import { ViewOrderListComponent } from './view-order-list/view-order-list.component';
import { OrderDetailsDialogComponent } from './view-order-list/order-details-dialog/order-details-dialog.component';
import { CaseDetailsComponent } from './case-details/case-details.component';

@NgModule({
  declarations: [ViewOrderListComponent, OrderDetailsDialogComponent, CaseDetailsComponent],
  imports: [
    CommonModule,
    MechanicRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    AngularFirestoreModule,
    FlexLayoutModule,
    MatDialogModule
  ]
})
export class MechanicModule { }
