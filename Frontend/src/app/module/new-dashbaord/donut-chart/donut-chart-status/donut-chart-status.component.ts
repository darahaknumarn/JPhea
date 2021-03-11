import { Component, OnInit } from '@angular/core';
import { DashbordService } from 'app/services/dashbord.service';

@Component({
  selector: 'app-donut-chart-status',
  templateUrl: './donut-chart-status.component.html',
  styleUrls: ['./donut-chart-status.component.scss']
})
export class DonutChartStatusComponent implements OnInit {

  isLoading: boolean = false;
  projectStatus: any[] = [];
  option: any;
  constructor(private dashboardService: DashbordService) { }

  ngOnInit(): void {
    // Get project by status
    this.getProjectStatus() 
   }

  private getProjectStatus() {
    this.isLoading =true ; 

    this.dashboardService.getProjectByStatus(true).subscribe(res => {
      if(res['data']) {
        //populate map from map info
        for (var i in res['data']) {
          let info = res['data'][i];  
          this.projectStatus.push({value: Number(info.totalReceived), name: info.statusName})
        }

        this.isLoading = false;
        
        // List all project group by status into donut chart.
        this.option = {
          title: { text: 'Project Status', left: 'center'},
          tooltip: {trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)'},
          legend: { top: '8%', left: 'center'},
          series: [
            {
              name: 'Status',
              type: 'pie',
              radius: ['40%', '60%'],
              selectedMode: 'single',
              data: this.projectStatus,
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
