

import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpService } from '@ecoinsoft/core-frontend/src/public-api';
import { ProjectService } from 'app/services/project.service';
import { IProject } from 'app/model/project';
import { DashbordService } from 'app/services/dashbord.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [{
    data: [1], label: 'Income'
  }];

  public projectSummary;

 
  constructor(
    private http: HttpService,
    private projectService: ProjectService,
    private dashbordService: DashbordService
  ) {



  }
  ngOnInit() {
    this.getProjectBalanceList()
    this.dashbordService.projectSummary().subscribe(res => {
      this.projectSummary = res.data[0]

    }

    )

  }


  getProjectBalanceList() {
    this.projectService.list().subscribe(res => {
      // this.barChartData=[]
      // this.barChartLabels = []
      let income = []
      let expanse = []
      let labels = []
      for (let i in res.data) {
        let project: IProject = res.data[i]
        if (project.totalReceived > 0 || project.totalExpanse > 0) {
          income.push(project.totalReceived)
          expanse.push(project.totalExpanse)
          labels.push(project.projectName)

        }

      }
      this.barChartLabels = labels;
      this.barChartData = [{
        data: income, label: 'Income'
      }, {
        data: expanse, label: 'Expanse'
      }]
    }

    )
  }
}
