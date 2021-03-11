import { Component, OnInit } from '@angular/core';
import { DashbordService } from 'app/services/dashbord.service';

@Component({
  selector: 'app-donut-chart-finance',
  templateUrl: './donut-chart-finance.component.html',
  styleUrls: ['./donut-chart-finance.component.scss']
})
export class DonutChartFinanceComponent implements OnInit {

  isLoading: boolean = false;
  projectFinaces: any[] = [];
  option: any;
  constructor(private dashboardService: DashbordService) { }

  ngOnInit(): void {
    // Get project by finance
    this.getProjectFinance() 
   }

  private getProjectFinance() {
    this.isLoading =true ; 

    this.dashboardService.getProjectByFinance(true).subscribe(res => {
      if(res['data']) {
        //populate map from map info
        for (var i in res['data']) {
          let info = res['data'][i];  
          this.projectFinaces.push({value: Number(info.totalReceived), name: info.financingName})
        }

        this.isLoading = false;
        
        // List all project group by finance into donut chart.
        this.option = {
          title: { text: 'Project Financing', left: 'center'},
          tooltip: {trigger: 'item'},
          legend: { top: '8%', left: 'center'},
          series: [
            {
              name: 'Financing',
              type: 'pie',
              radius: ['40%', '60%'],
              selectedMode: 'single',
              data: this.projectFinaces,
              emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    })
  }

}
