import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss']
})
export class PrintLayoutComponent implements OnInit {
   public projectId ; 
  constructor(private route: ActivatedRoute) {
   
   }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.projectId = this.route.snapshot.params['projectId']
   });
   window.print();
  }


}
