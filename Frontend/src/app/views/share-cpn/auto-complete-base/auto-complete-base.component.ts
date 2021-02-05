import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto-complete-base',
  template: `
    <p>
      auto-complete-base works!
    </p>
  `,
  styleUrls: ['./auto-complete-base.component.scss']
})
export class AutoCompleteBaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
