import { Component, OnInit } from '@angular/core';
import { DashbordService } from 'app/services/dashbord.service';

@Component({
  selector: 'app-donut-chart-location',
  templateUrl: './donut-chart-location.component.html',
  styleUrls: ['./donut-chart-location.component.scss']
})
export class DonutChartLocationComponent implements OnInit {

  isLoading: boolean = false;
  projectLocations: any[] = [];
  option: any;
  constructor(private dashboardService: DashbordService) { }

  ngOnInit(): void {
    // Get project by location
    this.getProjectLocation() 
   }

  private getProjectLocation() {
    this.isLoading =true ; 

    this.dashboardService.getProjectByLocation(true).subscribe(res => {
      if(res['data']) {
        //populate map from map info
        for (var i in res['data']) {
          let info = res['data'][i];  
          this.projectLocations.push({value: Number(info.totalReceived), name: info.locationName})
        }

        this.isLoading = false;
        
        // List all project group by location into donut chart.
        this.option = {
          title: { text: 'Project Location', left: 'center'},
          tooltip: {trigger: 'item'},
          legend: { top: '8%', left: 'center'},
          series: [
            {
              name: 'Location',
              type: 'pie',
              radius: ['40%', '60%'],
              selectedMode: 'single',
              data: this.projectLocations,
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
