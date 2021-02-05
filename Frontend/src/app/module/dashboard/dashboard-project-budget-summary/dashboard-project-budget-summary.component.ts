import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { DashbordService } from 'app/services/dashbord.service';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-dashboard-project-budget-summary',
  templateUrl: './dashboard-project-budget-summary.component.html',
  styleUrls: ['./dashboard-project-budget-summary.component.scss']
})
export class DashboardProjectBudgetSummaryComponent implements OnInit {
  public projectSummaryList; 

  displayedColumns: string[] = ['projectName', 'totalReceived', 'totalExpanse', 'balance'];
  params =new HttpParams(); 

  items:[
    { viewValue: "This Month" , value : 1}
  ]
  constructor(    
    private projectService : ProjectService , 

    ) { }

  ngOnInit(): void {
    this.shortBy("topBalance")
  }
  filterBy(value){
    
      this.params   = this.params.set('assignTo' , value )
      this.params = this.params.set('sort','balance')
      this.params = this.params.set('order', 'desc')
      this.listProjectSummary()
    
  }

  shortBy(value){
    
    this.params = this.params.set('sort','balance')
    if(value=="lessBalance"){
      this.params = this.params.set('order', 'asc')
    }else{
      this.params = this.params.set('order', 'desc')
      
    }
    this.listProjectSummary()
    
  }
  listProjectSummary(){
    this.projectService.list({
      params: this.params
    }).subscribe(res=>{
      this.projectSummaryList = res.data 
    })
  }

}
