import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit {

  currentRequest$: Observable<Request> = of()

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
          const data = action.payload.data()
          if (data?.value?.completed) {
            console.log("route to receipt")
            this.router.navigate([`/client/request/${caseId}/complete`]);
          }
          return data;
        })
      );

  }

}
