import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitFeedbackComponent } from './submit-feedback/submit-feedback.component';

const routes: Routes = [
  { path: 'submit', component: SubmitFeedbackComponent },
  { path: '**', redirectTo: 'submit' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbackRoutingModule {}
