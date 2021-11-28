import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Order, OrderDto } from '../order.entity';

export interface DialogData {
  order: OrderDto;
}

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent implements OnInit {

  order: Order
  time: Date
  id: string
  user: User | null = null

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.order = data.order.value as Order
    this.time = data.order.time
    this.id = data.order.id as string
  }

  ngOnInit(): void {
    this.user = this.authService.getUser()
  }

  accept(): void {
    this.firestore
      .doc(`request/${this.id}`)
      .update({
        "value.confirmed": true,
        "value.mechanicId": this.user?.uid
      })
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
