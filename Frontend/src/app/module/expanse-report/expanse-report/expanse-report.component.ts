import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService, MessageService } from '@ecoinsoft/core-frontend/src/public-api';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-expanse-report',
  templateUrl: './expanse-report.component.html',
  styleUrls: ['./expanse-report.component.scss']
})
export class ExpanseReportComponent implements OnInit {

  public viewContent: any;
  projectId = '';
  createdBy = '';
  expanseItemId = '';
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
    let datePipe = new DatePipe('en-US');
    let params = new HttpParams()
    if (this.createdBy) {
      params = params.append('createdBy', this.createdBy)
    }
    if (this.expanseItemId) {
      params = params.append('expanseItemId', this.expanseItemId)
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

    this.http.request('GET', '/report/expanseReport', {
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
  selectExpanseItem(value) {
    console.log('expanse Item selecte' , value)
    this.expanseItemId = value?.id
  }


}
