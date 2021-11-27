import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDto } from '../view-order-list/order.entity';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {

  currentCase: OrderDto | null = null

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private router: Router,
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
          this.currentCase = data.data() as OrderDto;
          this.currentCase.id = caseId as string
          //resolve(user);
        } else {
          //reject('User not found');
        }
      })

  }


  completed(): void {
    this.firestore
      .doc(`request/${this.currentCase?.id}`)
      .update({ "value.completed": true })
      .then(() => {
        this.router.navigate(['/mechanic/order-list']);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {

      });

  }


}
