import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService, MessageService } from '@ecoinsoft/core-frontend/src/public-api';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-transfer-fund-detail-report',
  templateUrl: './trandsfer-fund-detail-report.component.html',
  styleUrls: ['./trandsfer-fund-detail-report.component.scss']
})
export class TransferFundDetailReportComponent implements OnInit {

  public viewContent: any;
  fromProjectId = '';
  toProjectId = '';
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
    const datePipe = new DatePipe('en-US');
    let params = new HttpParams()

    if (this.fromProjectId) {
      params = params.append('fromProjectId', this.fromProjectId)
    }
    if (this.toProjectId) {
      params = params.append('toProjectId', this.toProjectId)
    }

    if (this.startDate) {
      params = params.append('startDate', datePipe.transform(this.startDate, 'yyyy-MM-dd'))
    }
    if (this.endDate) {
      params = params.append('endDate', datePipe.transform(this.endDate, 'yyyy-MM-dd'))
    }

    this.http.request('GET', '/report/transferFundDetailReport', {
      'responseType': 'html',
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
    this.fromProjectId = value?.id
  }
  selectToProject(val) {
    this.toProjectId = val?.id
  }

}
