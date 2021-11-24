import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { OrderDto } from './order.entity';

@Component({
  selector: 'app-view-order-list',
  templateUrl: './view-order-list.component.html',
  styleUrls: ['./view-order-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewOrderListComponent implements OnInit {
  userName = '';

  orderForm = new FormGroup({
    rn: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    source: new FormGroup(
      {
        friendsFamily: new FormControl(false),
        clinicHospital: new FormControl(false),
        searchEngine: new FormControl(false),
        facebook: new FormControl(false),
        instagram: new FormControl(false),
        other: new FormGroup({
          checked: new FormControl(false),
          value: new FormControl(''),
        }),
      },
      Validators.required
    ),
    comments: new FormControl(''),
  });

  latestOrder$: any = this.firestore
    .collection('request')
    .snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map((a) => this.mapToDto(a));
      })
    );

  editingOrderId: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      this.userName = user.name;
    });
  }

  get isOtherChecked(): boolean {
    return this.orderForm.get('source')?.value.other.checked;
  }

  submit(): void {
    this.firestore
      .collection('order')
      .add({
        value: this.orderForm.value,
        time: new Date(),
        user: this.userName,
      } as OrderDto)
      .then((res) => {
        this.snackBar.open(
          'Order submitted for ' + this.orderForm.value.rn,
          'Ok',
          { duration: 3000 }
        );
        this.orderForm.reset();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  private mapToDto(a: any): OrderDto {
    const data = a.payload.doc.data() as any;
    const id = a.payload.doc.id as string;
    const time = new Date(
      data.time.seconds * 1000 + data.time.nanoseconds / 1000000
    );
    return { id, time, value: data.value } as OrderDto;
  }

  editOrder(orderDto: OrderDto): void {
    this.editingOrderId = orderDto.id as string;
    const order = orderDto.value;
    this.orderForm.patchValue(order);
  }

  cancelEdit(): void {
    this.editingOrderId = null;
    this.orderForm.reset();
  }

  saveEdit(): void {
    console.log('Edit order form id: ', this.editingOrderId);
    this.firestore
      .doc(`order/${this.editingOrderId}`)
      .update({
        value: this.orderForm.value,
        user: this.userName,
      } as OrderDto)
      .then(() => {
        this.snackBar.open(
          'Order edited for ' + this.orderForm.value.rn,
          'Ok',
          { duration: 3000 }
        );
        this.orderForm.reset();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        this.editingOrderId = null;
      });
  }
}
