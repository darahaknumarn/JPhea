import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut-chart-location',
  templateUrl: './donut-chart-location.component.html',
  styleUrls: ['./donut-chart-location.component.scss']
})
export class DonutChartLocationComponent implements OnInit {

  isLoading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  // List all project group by location into donut chart.
  public option = {
    title: {
        text: 'Total Project Location',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
      top: '8%',
      left: 'center'
    },
    series: [
      {
        name: 'Projects',
        type: 'pie',
        radius: ['40%', '60%'],
        avoidLabelOverlap: false,
        data: [
          {value: 1048, name: 10},
          {value: 735, name: 20},
          {value: 1048, name: 30}
        ],
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
