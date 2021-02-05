import { Routes, RouterModule } from '@angular/router';
import { FinancaiilTransactionReportComponent } from './financaiil-transaction-report/financaiil-transaction-report.component';
import { PrintLayoutComponent } from './print-layout/print-layout.component';

export const routes: Routes = [
  { 
    path: '', 
    component: FinancaiilTransactionReportComponent, 
  
    data: { title: 'Financail Transaction Report', breadcrumb: 'Financail Transaction Report' } ,
   
    children:[
      { path: 'print', 
      component: PrintLayoutComponent,     
      data: { title: 'print', breadcrumb: 'print' } ,
     }
    ]
  },
];


