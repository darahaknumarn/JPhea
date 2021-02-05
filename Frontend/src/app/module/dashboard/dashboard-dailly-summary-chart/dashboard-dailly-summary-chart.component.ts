import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReportService } from 'app/services/report.service';

@Component({
    selector: 'app-dashboard-dailly-summary-chart',
    templateUrl: './dashboard-dailly-summary-chart.component.html',
    styleUrls: ['./dashboard-dailly-summary-chart.component.scss']
})
export class DashboardDaillySummaryChartComponent implements OnInit {

    isLoading = false;

    dateData = [];
    options: any;
    selected = 7;
    items = [
        {value: 7, viewValue: 'Last 7 days'},
        {value: 14, viewValue: 'Last 14 days'},
        {value: 30 , viewValue: 'Last 30 days'},
        {value: 60 , viewValue: 'Last 60 days'},
        {value: 90 , viewValue: 'Last 90 days'}
      ];

    constructor(private reportService: ReportService,
        private datePie: DatePipe) {

    }



    ngOnInit(): void {

        this.loadReport(7)
    }

    loadReport(duration:number){

        let startDate = new Date()
        startDate.setDate(startDate.getDate() - duration)

        let endDate = new Date()


        this.isLoading =true ;   


        this.reportService.listDailySummaryReport(this.datePie.transform(startDate, 'yyyy-MM-dd'), this.datePie.transform(endDate, 'yyyy-MM-dd')).subscribe(res => {
            this.dateData = res.data.map(r => r.date)

            // this.receiveFundData = res.data.map(r => r.receive_fund)

            this.isLoading =false ; 
            this.options = {
                title: {
                    text: 'Daily Summary Report'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Expanse', 'Receive Fund'] // transaction type
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {
                            title: 'Download Report'
                        },

                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.dateData// date
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'Expanse',
                        type: 'line',
                        stack: 'stack',
                        data: res.data.map(r => r.expanse)// amount in each day 
                    },
                    {
                        name: 'Receive Fund',
                        type: 'line',
                        stack: 'stack',
                        data: res.data.map(r => r.receive_fund)

                    },

                ]
            };
        })
    }
    selectFilter(val){
        this.loadReport(val)
        
    }


}
