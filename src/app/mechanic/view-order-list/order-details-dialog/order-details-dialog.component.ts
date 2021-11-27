import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order, OrderDto } from '../order.entity';

export interface DialogData {
  order: OrderDto;
}

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent {

  order: Order
  time: Date
  id: string

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private firestore: AngularFirestore,
  ) {
    this.order = data.order.value as Order
    this.time = data.order.time
    this.id = data.order.id as string
  }

  accept(): void {
    this.firestore
      .doc(`request/${this.id}`)
      .update({ "value.confirmed": true })
      .then(() => {
        this.dialogRef.close(true);
        this.router.navigate(['/mechanic/case', this.data.order.id]);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {

      });

  }

  close(): void {
    this.dialogRef.close(false);
  }

}
