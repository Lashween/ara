import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, RequestDto } from '../request-assistance/request.entity';

@Component({
  selector: 'app-request-completed',
  templateUrl: './request-completed.component.html',
  styleUrls: ['./request-completed.component.scss']
})
export class RequestCompletedComponent implements OnInit {

  mechanic: any

  completedRequest$: Observable<RequestDto> = of()

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router,) { }

  ngOnInit(): void {

    const caseId = this.route.snapshot.paramMap.get('id');
    console.log("completed case:" + caseId)

    this.completedRequest$ = this.firestore
      .doc(`request/${caseId}`)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          const data: RequestDto = action.payload.data()
          const request = data?.value as Request
          if (request.confirmed) {
            this.firestore
              .doc(`users/${request.mechanicId}`)
              .get()
              .toPromise()
              .then((data) => {
                if (data.exists) {
                  this.mechanic = data.data();
                  console.log("mechanic: ", this.mechanic)
                }
              });
          }
          return data
        })
      );

  }

}
