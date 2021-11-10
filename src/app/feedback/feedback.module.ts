import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { SubmitFeedbackComponent } from './submit-feedback/submit-feedback.component';
import { FeedbackHistoryComponent } from './submit-feedback/feedback-history/feedback-history.component';
import { FeedbackFormComponent } from './submit-feedback/feedback-form/feedback-form.component';

@NgModule({
  declarations: [SubmitFeedbackComponent, FeedbackHistoryComponent, FeedbackFormComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    AngularFirestoreModule,
    FlexLayoutModule,
  ],
})
export class FeedbackModule {}
