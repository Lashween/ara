import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) { }

  ngOnInit(): void {

    const caseId = this.route.snapshot.paramMap.get('id');

    console.log(caseId)

    this.firestore
      .doc(`request/${caseId}`)
      .get()
      .toPromise()
      .then(data => {
        if (data.exists) {
          const currentCase = data.data();
          console.log('Case: ', currentCase);
          //resolve(user);
        } else {
          //reject('User not found');
        }
      })


  }

}
