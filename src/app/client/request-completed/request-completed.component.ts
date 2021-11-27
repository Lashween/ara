import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-completed',
  templateUrl: './request-completed.component.html',
  styleUrls: ['./request-completed.component.scss']
})
export class RequestCompletedComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    const caseId = this.route.snapshot.paramMap.get('id');
    console.log("completed case:" + caseId)

  }

}
