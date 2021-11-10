import { FormControl, FormGroup } from '@angular/forms';

export interface FeedbackDto {
  id?: string;
  time: Date;
  value: Feedback | FormGroup;
  user?: string;
}

export interface Feedback {
  rn: string | FormControl;
  name: string | FormControl;
  source: Source | FormGroup;
  comments: string | FormControl;
}

interface Source {
  friendsFamily: boolean | FormControl;
  clinicHospital: boolean | FormControl;
  searchEngine: boolean | FormControl;
  facebook: boolean | FormControl;
  instagram: boolean | FormControl;
  other: OtherSource | FormGroup;
}

interface OtherSource {
  checked: boolean | FormControl;
  value: string | FormControl;
}
