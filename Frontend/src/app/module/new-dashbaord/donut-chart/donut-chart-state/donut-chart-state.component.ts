import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut-chart-state',
  templateUrl: './donut-chart-state.component.html',
  styleUrls: ['./donut-chart-state.component.scss']
})
export class DonutChartStateComponent implements OnInit {

  isLoading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  // List all project group by location into donut chart.
  public option = {
    title: {
        text: 'Total Project State',
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
          {value: 1048, name: 30},
          {value: 735, name: 40}
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
