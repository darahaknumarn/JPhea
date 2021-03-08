import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut-chart-status',
  templateUrl: './donut-chart-status.component.html',
  styleUrls: ['./donut-chart-status.component.scss']
})
export class DonutChartStatusComponent implements OnInit {

  isLoading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  // List all project group by status into donut chart.
  public option = {
    title: {
        text: 'Total Project Status',
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
            {value: 735, name: 20}
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
};

}
