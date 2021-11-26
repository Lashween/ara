import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {

  currentCase: any

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
          this.currentCase = data.data();
          //resolve(user);
        } else {
          //reject('User not found');
        }
      })


  }

}
