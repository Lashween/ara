import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientRoutingModule } from './client-routing.module';
import { RequestAssistanceComponent } from './request-assistance/request-assistance.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { RequestCompletedComponent } from './request-completed/request-completed.component';

@NgModule({
  declarations: [RequestAssistanceComponent, WorkshopsComponent, RequestCompletedComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    AngularFirestoreModule,
    FlexLayoutModule,
  ],
})
export class ClientModule { }
