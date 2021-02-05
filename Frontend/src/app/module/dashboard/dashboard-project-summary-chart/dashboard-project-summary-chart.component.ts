import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard-project-summary-chart',
  templateUrl: './dashboard-project-summary-chart.component.html',
  styleUrls: ['./dashboard-project-summary-chart.component.scss']
})
export class DashboardProjectSummaryChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  posList = [
    'left', 'right', 'top', 'bottom',
    'inside',
    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
]
app: any={configParameters : {
    rotate: {
        min: -90,
        max: 90
    },
    align: {
        options: {
            left: 'left',
            center: 'center',
            right: 'right'
        }
    },
    verticalAlign: {
        options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        }
    },
    position: {
        options: echarts.util.reduce(this.posList, function (map, pos) {
            map[pos] = pos;
            return map;
        }, {})
    },
    distance: {
        min: 0,
        max: 100
    }
},

config : {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    // onChange: function () {
    //     var labelOption = {
    //         normal: {
    //             rotate: this.app.config.rotate,
    //             align: this.app.config.align,
    //             verticalAlign: this.app.config.verticalAlign,
    //             position: this.app.config.position,
    //             distance: this.app.config.distance
    //         }
    //     };
    //     myChart.setOption({
    //         series: [{
    //             label: labelOption
    //         }, {
    //             label: labelOption
    //         }, {
    //             label: labelOption
    //         }, {
    //             label: labelOption
    //         }]
    //     });
    // }
}};


 labelOption = {
    show: true,
    position: this.app.config.position,
    distance: this.app.config.distance,
    align: this.app.config.align,
    verticalAlign: this.app.config.verticalAlign,
    rotate: this.app.config.rotate,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
        name: {
            textBorderColor: '#fff'
        }
    }
};

chartOption = {
    color: ['#003366',  '#e5323e'],
    tooltip: {
        trigger: 'axis',
        // axisPointer: {
        //     type: 'shadow'
        // }
    },
    legend: {
        data: ['Forest', 'Wetland']
    },
    toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
            dataView: {show: false, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {show: false},
            data: ['2012', '2013', '2014', '2015', '2016']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            label: this.labelOption,
            data: [320, 332, 301, 334, 390]
        },
        {
            name: 'Steppe',
            type: 'bar',
            label: this.labelOption,
            data: [220, 182, 191, 234, 290]
        },
        
    ]
};
 
}
