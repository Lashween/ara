import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { FeedbackDto } from './feedback.entity';

@Component({
  selector: 'app-submit-feedback',
  templateUrl: './submit-feedback.component.html',
  styleUrls: ['./submit-feedback.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubmitFeedbackComponent implements OnInit {
  userName = '';

  feedbackForm = new FormGroup({
    rn: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    source: new FormGroup(
      {
        friendsFamily: new FormControl(false),
        clinicHospital: new FormControl(false),
        searchEngine: new FormControl(false),
        facebook: new FormControl(false),
        instagram: new FormControl(false),
        other: new FormGroup({
          checked: new FormControl(false),
          value: new FormControl(''),
        }),
      },
      Validators.required
    ),
    comments: new FormControl(''),
  });

  latestFeedback$: any = this.firestore
    .collection('feedback', (ref) => {
      const currentDate = new Date(new Date().setHours(0, 0, 0, 0));
      return ref.where('time', '>', currentDate).orderBy('time', 'desc');
    })
    .snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map((a) => this.mapToDto(a));
      })
    );

  editingFeedbackId: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      this.userName = user.name;
    });
  }

  get isOtherChecked(): boolean {
    return this.feedbackForm.get('source')?.value.other.checked;
  }

  submit(): void {
    this.firestore
      .collection('feedback')
      .add({
        value: this.feedbackForm.value,
        time: new Date(),
        user: this.userName,
      } as FeedbackDto)
      .then((res) => {
        this.snackBar.open(
          'Feedback submitted for ' + this.feedbackForm.value.rn,
          'Ok',
          { duration: 3000 }
        );
        this.feedbackForm.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  private mapToDto(a: any): FeedbackDto {
    const data = a.payload.doc.data() as any;
    const id = a.payload.doc.id as string;
    const time = new Date(
      data.time.seconds * 1000 + data.time.nanoseconds / 1000000
    );
    return { id, time, value: data.value } as FeedbackDto;
  }

  editFeedback(feedbackDto: FeedbackDto): void {
    this.editingFeedbackId = feedbackDto.id as string;
    const feedback = feedbackDto.value;
    this.feedbackForm.patchValue(feedback);
  }

  cancelEdit(): void {
    this.editingFeedbackId = null;
    this.feedbackForm.reset();
  }

  saveEdit(): void {
    console.log('Edit feedback form id: ', this.editingFeedbackId);
    this.firestore
      .doc(`feedback/${this.editingFeedbackId}`)
      .update({
        value: this.feedbackForm.value,
        user: this.userName,
      } as FeedbackDto)
      .then(() => {
        this.snackBar.open(
          'Feedback edited for ' + this.feedbackForm.value.rn,
          'Ok',
          { duration: 3000 }
        );
        this.feedbackForm.reset();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.editingFeedbackId = null;
      });
  }
}
