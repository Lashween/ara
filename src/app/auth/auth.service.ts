import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    public auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  user$ = new BehaviorSubject<any | null>(null);
  currentGroup$ = new BehaviorSubject<string>('');

  currentSelectedGroup$ = this.currentGroup$.asObservable();

  checkAuth(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      return this.getUser() ? observer.next(true) : observer.next(false);
    }).pipe(
      catchError((err: any) => {
        console.error(err);
        return of(false) as Observable<boolean>;
      })
    );
  }

  login(username: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const email = `${username}`;
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          const uid = res.user?.uid;
          if (uid) { return this.getUserDetails(uid); }
          else { throw new Error('Invalid uid'); }
        })
        .then((user) => {
          this.user$.next(user);
          resolve();
        })
        .catch((error) => {
          console.error(error);
          this.logout();
          reject(error);
        });
    });
  }

  logout(): void {
    this.user$.next(null);
    localStorage.removeItem('user');

    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((onrejected) => {
        console.error(onrejected);
        this.router.navigate(['/login']);
      });
  }

  getUser(): any | null {
    if (!this.user$.value) {
      const user = localStorage.getItem('user');
      if (user) {
        this.user$.next(JSON.parse(user));
      }
    }
    return this.user$.value;
  }

  private getUserDetails(uid: string): Promise<any> {
    console.log('uid: ', uid);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .doc(`users/${uid}`)
        .get()
        .toPromise()
        .then((data) => {
          if (data.exists) {
            let user: any = data.data();
            user.uid = uid
            console.log('User data: ', user);
            localStorage.setItem('user', JSON.stringify(user));
            resolve(user);
          } else {
            reject('User not found');
          }
        });
    });
  }
}
