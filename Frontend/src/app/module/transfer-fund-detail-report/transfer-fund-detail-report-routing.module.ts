import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TransferFundDetailReportComponent} from './transfer-fund-detail-report/transfer-fund-detail-report.component';

const routes: Routes = [{
  path: '',
  component: TransferFundDetailReportComponent ,
  data: { title: 'Transfer Fund Detail Report', breadcrumb: 'Transfer Fund Detail Report' } ,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferFundDetailReportRoutingModule { }
