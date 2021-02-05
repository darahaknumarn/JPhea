import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService, MessageService } from '@ecoinsoft/core-frontend/src/public-api';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-recieve-fund-detail-report',
  templateUrl: './receive-fund-detail-report.component.html',
  styleUrls: ['./recieve-fund-detail-report.component.scss']
})
export class ReceiveFundDetailReportComponent implements OnInit {

  public viewContent: any;
  projectId = '';
  createdBy = '';
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
    if (this.createdBy) {
      params = params.append('createdBy', this.createdBy)
    }

    if (this.projectId) {
      params = params.append('projectId', this.projectId)
    }

    if (this.startDate) {
      params = params.append('startDate', datePipe.transform(this.startDate, 'yyyy-MM-dd'))
    }
    if (this.endDate) {
      params = params.append('endDate', datePipe.transform(this.endDate, 'yyyy-MM-dd'))
    }

    this.http.request('GET', '/report/receiveFundDetailReport', {
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
    this.projectId = value?.id
  }
  selectUser(value) {
    this.createdBy = value?.id

  }


}
