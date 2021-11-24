import { FormControl, FormGroup } from '@angular/forms';

export interface RequestDto {
  id?: string;
  time: Date;
  value: Request | FormGroup;
  user?: string;
}

export interface Request {
  carModel: string | FormControl;
  name: string | FormControl;
  location: string | FormControl;
  issue: string | FormControl;
}
