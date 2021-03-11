import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DashbordService } from 'app/services/dashbord.service';

@Component({
  selector: 'app-bubble-chart-report',
  templateUrl: './bubble-chart-report.component.html',
  styleUrls: ['./bubble-chart-report.component.scss']
})
export class BubbleChartReportComponent implements OnInit {

  isLoading = false;
  projectTypies: any[] = [];
  bubbleChartOptions: any;
  constructor(private datePie: DatePipe, private dashboardService: DashbordService) { }

  ngOnInit(): void {
    this.loadProjectType()
  }

  sizeFunction(x) {
    var y = Math.sqrt(x / 5e8) + 0.1;
    return y * 80;
  };

  private loadProjectType() {
    this.isLoading = true;

    this.dashboardService.getProjectByType(true).subscribe(res => {
      if (res['data']) {
        res['data'].forEach(info => {
          this.projectTypies.push([info.totalReceived, info.projectTypeId, info.projectTypeName])
        });

        this.isLoading = false;
        // Add project's data into bubble chart
        this.bubbleChartOptions = { 
          title: { text: 'Bubble Chart' },
          grid: { left: '6%', right: '4%', bottom: '3%', containLabel: true },
          legend: { enabled: false },
          tooltip: {
            formatter: function (param) {
              return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 14px;padding-bottom: 2px;margin-bottom: 2px">'
                + param.data[2]
                + '</div>'
                + 'Total Investment' + '：' +  param.data[0] + '<br>'
                + 'Number of Projects' + '：' + param.data[1] + '<br>';
            }
          },
          xAxis: {
            name: 'Total Received', 
            nameGap: 35,
            nameLocation: 'middle',
            splitLine: { show: false },
            axisLabel: { formatter: '{value}B', interval: 0, rotate: 30 },
          },
          yAxis: {
            name: "Number of Projects",
            nameGap: 30,
            nameLocation: 'middle',
            splitLine: { show: false },
          },
          series: [
            {
              type: 'scatter',
              data: this.projectTypies
            }
          ],
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'quinticInOut'
        }
      }
    });
  }
  
}
