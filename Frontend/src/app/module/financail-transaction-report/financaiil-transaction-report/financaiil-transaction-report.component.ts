import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService, MessageService } from '@ecoinsoft/core-frontend/src/public-api';

import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-financaiil-transaction-report',
  templateUrl: './financaiil-transaction-report.component.html',
  styleUrls: ['./financaiil-transaction-report.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FinancaiilTransactionReportComponent implements OnInit {
  public viewContent: any;
  projectId = "";
  createdBy = "";
  public startDate;
  public endDate;

  transactionType;
  constructor(private http: HttpService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageService
  ) { }

  ngOnInit(): void {

  }
  previewReport() {
    // this.router.navigate(['print' , {"projectId" : this.projectId}] , {relativeTo: this.route} )
    var datePipe = new DatePipe('en-US');
    if (!this.projectId) {
      this.message.warning("Please select project to view report")
      return
    }
    let params = new HttpParams().append("projectId", this.projectId)
    if (this.createdBy) {
      params = params.append("createdBy", this.createdBy)
    }

    if (this.startDate) {
      params = params.append("startDate", datePipe.transform(this.startDate, 'yyyy-MM-dd'))
    }
    if (this.endDate) {
      params = params.append("endDate", datePipe.transform(this.endDate, 'yyyy-MM-dd'))
    }
    if (this.transactionType) {
      params = params.append("transactionType", this.transactionType)
    }


    this.http.request("GET", "/report/financialTransactionReport", {
      "responseType": "html",
      params: params
    }).subscribe(res => {
      const iframe = document.getElementById('iframe') as HTMLIFrameElement;
      iframe.contentDocument.open();
      iframe.contentDocument.write(res);
      iframe.contentDocument.close();
    })
  }


  print() {
    const iframe = document.getElementById('iframe') as HTMLIFrameElement;
    iframe.contentWindow.print();
  }

  selectProject(value) {
    this.projectId = value.id
  }
  selectUser(value) {
    this.createdBy = value.id

  }
  selectTransactionType(value) {
    console.log(value);

    this.transactionType = value.name
  }

}
