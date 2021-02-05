import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReceiveFundDetailReportComponent} from './recieve-fund-detail-report/receive-fund-detail-report.component';

const routes: Routes = [

  {
    path: '',
    component: ReceiveFundDetailReportComponent,

    data: { title: 'Receive Fund Detail Report', breadcrumb: 'Receive Fund Detail Report' } ,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecieveFundDetailReportRoutingModule { }
