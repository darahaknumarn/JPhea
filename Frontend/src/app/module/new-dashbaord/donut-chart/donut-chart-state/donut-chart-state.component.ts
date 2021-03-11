import { Component, OnInit } from '@angular/core';
import { DashbordService } from 'app/services/dashbord.service';

@Component({
  selector: 'app-donut-chart-state',
  templateUrl: './donut-chart-state.component.html',
  styleUrls: ['./donut-chart-state.component.scss']
})
export class DonutChartStateComponent implements OnInit {

  isLoading: boolean = false;
  projectStates: any[] = [];
  option: any;
  constructor(private dashboardService: DashbordService) { }

  ngOnInit(): void {
    // Get project by state
    this.getProjectState() 
   }

  private getProjectState() {
    this.isLoading =true ; 

    this.dashboardService.getProjectByState(true).subscribe(res => {
      if(res['data']) {
        //populate map from map info
        for (var i in res['data']) {
          let info = res['data'][i];  
          this.projectStates.push({value: Number(info.totalReceived), name: info.stateName})
        }

        this.isLoading = false;
        
        // List all project group by state into donut chart.
        this.option = {
          title: { text: 'Project State', left: 'center'},
          tooltip: {trigger: 'item'},
          legend: { top: '8%', left: 'center'},
          series: [
            {
              name: 'State',
              type: 'pie',
              radius: ['40%', '60%'],
              selectedMode: 'single',
              data: this.projectStates,
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
