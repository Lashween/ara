import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    isMechanic: new FormControl(false, Validators.required),
  });

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void { }

  register(): void {
    console.log(this.registerForm.value)
    this.isLoading = true;
    this.authService
      .register(this.registerForm.value.email, this.registerForm.value.password)
      .then((uid: string) => {
        console.log("uid: ", uid);
        const name = this.registerForm.value.name
        const role = this.registerForm.value.isMechanic ? 'mechanic' : 'client'

        this.firestore
          .collection('users')
          .doc(uid)
          .set({ name, role })
          .then((res) => {
            console.log(res)
            this.snackBar.open(
              name + ' registered as a new user',
              'Ok',
              { duration: 10000 }
            );
            this.router.navigate(['/login']);
          })
          .catch((e) => {
            console.log(e);
          });

      })
      .catch((error: any) => {
        console.error(error);
        this.snackBar.open(error.message, 'Dismiss');
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
