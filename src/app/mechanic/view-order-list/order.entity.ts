import { FormControl, FormGroup } from '@angular/forms';

export interface OrderDto {
  id?: string;
  time: Date;
  value: Order | FormGroup;
  user?: string;
}

export interface Order {
  carModel: string | FormControl;
  name: string | FormControl;
  location: string | FormControl;
  issue: string | FormControl;
}
