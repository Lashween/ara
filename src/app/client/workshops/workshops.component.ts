import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, RequestDto } from '../request-assistance/request.entity';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit {

  mechanic: any

  currentRequest$: Observable<RequestDto> = of()

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router,
  ) { }

  ngOnInit(): void {

    const caseId = this.route.snapshot.paramMap.get('id');

    console.log(caseId)

    this.currentRequest$ = this.firestore
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
          if (request.completed) {
            console.log("route to receipt")
            this.router.navigate([`/client/request/${caseId}/complete`]);
          }
          return data;
        })
      );

  }

}
