import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpanseReportComponent } from './expanse-report/expanse-report.component';

const routes: Routes = [
  { 
    path: '', 
    component: ExpanseReportComponent, 
  
    data: { title: 'Financail Transaction Report', breadcrumb: 'Financail Transaction Report' } ,
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpanseReportRoutingModule { }
