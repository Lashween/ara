import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
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
    name: new FormControl('', Validators.required),
    carModel: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    issue: new FormControl(''),
  });

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
          'Request submitted for ' + this.RequestForm.value.name,
          'Ok',
          { duration: 3000 }
        );
        this.RequestForm.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }

}
