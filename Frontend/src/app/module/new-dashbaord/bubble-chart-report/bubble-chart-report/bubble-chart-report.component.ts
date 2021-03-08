import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bubble-chart-report',
  templateUrl: './bubble-chart-report.component.html',
  styleUrls: ['./bubble-chart-report.component.scss']
})
export class BubbleChartReportComponent implements OnInit {

  isLoading = false;
  constructor(private datePie: DatePipe) { }

  ngOnInit(): void {}


  // List all project into bubble chart.
  private data = [
    [[28604,77,17096869,'Australia',1990, 'red'],[26424,75.7,57110117,'United Kingdom',1990, 'black'],[37062,30,252847810,'United States',1990, 'bule']],
  ];

  // Add project's data into bubble chart
  public bubbleChartOptions = { 
    title: { text: 'Bubble Chart' },
    grid: { left: '6%', right: '4%', bottom: '3%', containLabel: true },
    legend: { enabled: false },
    tooltip: {
      formatter: function (param) {
        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 14px;padding-bottom: 2px;margin-bottom: 2px">'
          + param.data[3] + " in " + param.data[4]
          + '</div>'
          + 'Total Investment' + '：' +  param.data[0] + '<br>'
          + 'Number of Projects' + '：' + param.data[1] + '<br>';
      }
    },
    xAxis: {
      name: 'Total Investment', 
      nameGap: 35,
      nameLocation: 'middle',
      splitLine: { show: false },
      axisLabel: { formatter: '{value}B', interval: 0, rotate: 30 },
    },
    yAxis: {
      name: "Number of Projects",
      nameGap: 35,
      nameLocation: 'middle',
      splitLine: { show: false },
    },
    series: [
      {
        type: 'scatter',
        data: this.data[0],
        symbolSize: function (data) {
          return Math.sqrt(data[3]) / 5e2;
        },
        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(120, 36, 50, 0.5)', shadowOffsetY: 5},
      }
    ],
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'quinticInOut'
  }
  
}
