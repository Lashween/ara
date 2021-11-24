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
import { RequestFormComponent } from './request-assistance/request-form/request-form.component';

@NgModule({
  declarations: [RequestAssistanceComponent, RequestFormComponent],
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
