import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';
import { OrderDto } from './order.entity';

@Component({
  selector: 'app-view-order-list',
  templateUrl: './view-order-list.component.html',
  styleUrls: ['./view-order-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewOrderListComponent implements OnInit {
  userName = '';

  latestOrder$: any = this.firestore
    .collection('request', (ref) => {
      return ref.where('value.completed', "!=", true);
    })
    .snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map((a) => this.mapToDto(a));
      })
    );

  constructor(
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.user$.pipe(take(1)).subscribe((user) => {
      this.userName = user.name;
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

  showDetails(order: OrderDto): void {

    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, { data: { order }, });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
