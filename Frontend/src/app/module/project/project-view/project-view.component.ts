import { Component,  OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import {  Environment } from '@ecoinsoft/core-frontend/src/public-api';

import { IProject } from 'app/model/project';
import { ProjectService } from 'app/services/project.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  projectId:number;
  projectData: IProject;
  showExpanse = false;
  showTransfer=false; 
  showReceive=false;
  sharedChartOptions: any = {
    responsive: true,
    // maintainAspectRatio: false,
    legend: {
      display: false,
      position: 'bottom'
    }
  };


   // Doughnut
   public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Expanse', 'Balance', 'Transfer'];
  public pieChartData: SingleDataSet =[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public doughnutChartColors: any[] = [{
    backgroundColor: ['#f44336', '#3f51b5', '#ffeb3b', '#4caf50', '#2196f']
  }];

  @ViewChild("drawer") drawer:MatDrawer;
 
  constructor( 
     private route: ActivatedRoute,
     private service : ProjectService,     
    private loader: AppLoaderService,
    public printDialog: MatDialog,
    private env: Environment 
    
    ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];

    if (this.projectId){
      this.loadProject();
    }
  }

  loadProject(){
    this.loader.open();
    this.service.get(this.projectId)
    .subscribe(res => {
      this.projectData=res.data;
      this.projectData.id = this.projectId ; 
      this.loader.close();
      this.assignValueToChart();
    });
  }
  assignValueToChart(){
    this.pieChartData = [this.projectData.totalExpanse  , this.projectData.balance , this.projectData.balanceTransfer]
  }
  
  showFmExpanse(){
    this.drawer.toggle()
    this.showExpanse =true;
    this.showTransfer= false ;
    this.showReceive = false ; 
  }
  showFmReceive(){
    this.drawer.toggle()
    this.showReceive =true;
    this.showTransfer= false ;
    this.showExpanse= false ; 
  }
  showFmTransfer(){
    this.drawer.toggle()
    this.showTransfer =true;
    this.showExpanse= false ;
    this.showReceive = false ; 
  }
  closeSideForm(){
    this.drawer.toggle();
    this.showTransfer=false;  
    this.showReceive = false ; 
    this.loadProject();
  }

  goToLink(url){    
    window.open(url, "_blank");
  }

  

   

}
