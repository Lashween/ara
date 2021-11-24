import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  latestOrder$: any = this.firestore
    .collection('request')
    .snapshotChanges()
    .pipe(
      map((actions) => {
        return actions.map((a) => this.mapToDto(a));
      })
    );

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

  private mapToDto(a: any): OrderDto {
    const data = a.payload.doc.data() as any;
    const id = a.payload.doc.id as string;
    const time = new Date(
      data.time.seconds * 1000 + data.time.nanoseconds / 1000000
    );
    return { id, time, value: data.value } as OrderDto;
  }

}
