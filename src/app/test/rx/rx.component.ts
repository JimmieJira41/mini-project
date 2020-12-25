import { Component, OnInit } from '@angular/core';
import * as Rx from "rxjs";

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css']
})
export class RxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const subject = new Rx.Subject();

    // subscriber 1
    subject.subscribe((data) => {
      console.log('Subscriber A:', data);
    });

    subject.next(Math.random())
    subject.next(Math.random())
    subject.next(Math.random())

    // subscriber 2
    subject.subscribe((data) => {
      console.log('Subscriber B:', data);
    });

    subject.next(Math.random());


    subject.subscribe((data) => {
      console.log('Subscriber C:', data);
    });

    subject.next(Math.random());

    subject.subscribe((data) => {
      console.log('Subscriber D:', data);
    });

    subject.next(Math.random());


  }

}
