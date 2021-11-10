import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  login(): void {
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .then(() => {
        console.log('Login success');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error(error);
        this.snackBar.open(error.message, 'Dismiss');
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
