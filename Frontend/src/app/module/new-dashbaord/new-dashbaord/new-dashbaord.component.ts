import { Component, OnInit } from '@angular/core';
import { DashbordService } from 'app/services/dashbord.service';

@Component({
  selector: 'app-new-dashbaord',
  templateUrl: './new-dashbaord.component.html',
  styleUrls: ['./new-dashbaord.component.scss']
})
export class NewDashbaordComponent implements OnInit {

  public projectSummary;
  constructor(private dashbordService: DashbordService) { }

  ngOnInit(): void {
    this.dashbordService.projectSummary().subscribe(res => {
      this.projectSummary = res.data[0]
    });
  }

}
