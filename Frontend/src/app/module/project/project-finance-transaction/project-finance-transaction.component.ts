import { HttpParams } from '@angular/common/http';
import {  Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CredentialsService } from '@ecoinsoft/core-frontend/src/lib/authentication/credentials.service';
import { Environment, HttpService } from '@ecoinsoft/core-frontend/src/public-api';
import { FinanceTransactionService } from 'app/services/finance-transaction.service';
import { ProjectPrintExpanseComponent } from '../project-print-expanse/project-print-expanse.component';

@Component({
  selector: 'app-project-finance-transaction',
  templateUrl: './project-finance-transaction.component.html',
  styleUrls: ['./project-finance-transaction.component.scss']
})
export class ProjectFinanceTransactionComponent implements OnInit {

  @Input() projectId;
  data = [];
  constructor(
    private financeTransaction: FinanceTransactionService,
    private printDialog : MatDialog , 
    private env : Environment,
    private http : HttpService,
    private cred: CredentialsService , 
    private environment: Environment 
  ) {

  }

  ngOnInit(): void {
    this.listFinanaceTransaction();

  }
  listFinanaceTransaction(type?) {
    let params = new HttpParams().append('projectId', this.projectId).append('order', 'desc');

    if (type) {
      params = params.append('transactionType', type)
    }

    this.financeTransaction.list({ params: params }).subscribe(res => {
      this.data = res.data
    })

  }

  openPrintDialog(expanseId):void{
    
    const dialogRef = this.printDialog.open(ProjectPrintExpanseComponent, {
      width: '350px',
      data: {expanseId : expanseId }
    });

    dialogRef.afterClosed().subscribe(result => {

      let params = "?id="+result.id+"&printAdvanceVoucher="+result.printAdvanceVoucher+"&printExpanse="+result.printExpanse
                    +"&printLiquidation="+result.printLiquidation+"&printRequestExpanse="+result.printRequestExpanse ; 
      let token = 
    window.open(this.env.serverUrl+'/expanse/print'+params, "_blank");
      //TODO inject http and call open window print
      // this.http.get(this.env.serverUrl+'/expanse/print',{
      //   params : result,
      //   headers:{
      //     Authorization : 'Bearer ' + this.cred.credentials.token, 
      //     'X-API-KEY' : this.environment.xApiKey
      //   }
      // }).subscribe(result=>{
      //   console.log("sucess::: ")     
      //     console.log(result);     
      // })
   
      
    
    });

  }

}
