import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { RequestDto } from './request.entity';

@Component({
  selector: 'app-request-assistance',
  templateUrl: './request-assistance.component.html',
  styleUrls: ['./request-assistance.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RequestAssistanceComponent implements OnInit {
  userName = '';

  RequestForm = new FormGroup({
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

  latestRequest$: any = this.firestore
    .collection('request', (ref) => {
      const currentDate = new Date(new Date().setHours(0, 0, 0, 0));
      return ref.where('time', '>', currentDate).orderBy('time', 'desc');
    })
    .snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map((a) => this.mapToDto(a));
      })
    );

  editingRequestId: string | null = null;

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
    return this.RequestForm.get('source')?.value.other.checked;
  }

  submit(): void {
    this.firestore
      .collection('request')
      .add({
        value: this.RequestForm.value,
        time: new Date(),
        user: this.userName,
      } as RequestDto)
      .then((res) => {
        this.snackBar.open(
          'Request submitted for ' + this.RequestForm.value.rn,
          'Ok',
          { duration: 3000 }
        );
        this.RequestForm.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  private mapToDto(a: any): RequestDto {
    const data = a.payload.doc.data() as any;
    const id = a.payload.doc.id as string;
    const time = new Date(
      data.time.seconds * 1000 + data.time.nanoseconds / 1000000
    );
    return { id, time, value: data.value } as RequestDto;
  }

  editRequest(requestDto: RequestDto): void {
    this.editingRequestId = requestDto.id as string;
    const request = requestDto.value;
    this.RequestForm.patchValue(request);
  }

  cancelEdit(): void {
    this.editingRequestId = null;
    this.RequestForm.reset();
  }

  saveEdit(): void {
    console.log('Edit request form id: ', this.editingRequestId);
    this.firestore
      .doc(`request/${this.editingRequestId}`)
      .update({
        value: this.RequestForm.value,
        user: this.userName,
      } as RequestDto)
      .then(() => {
        this.snackBar.open(
          'Request edited for ' + this.RequestForm.value.rn,
          'Ok',
          { duration: 3000 }
        );
        this.RequestForm.reset();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.editingRequestId = null;
      });
  }
}
