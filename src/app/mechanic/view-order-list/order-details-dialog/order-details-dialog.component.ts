import { Component, Inject } from '@angular/core';
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

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {
    this.order = data.order.value as Order
    this.time = data.order.time
  }

  accept(): void {
    this.dialogRef.close(true);
    this.router.navigate(['/mechanic/case', this.data.order.id]);
  }

  close(): void {
    this.dialogRef.close(false);
  }

}
