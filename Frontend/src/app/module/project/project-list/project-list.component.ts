import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppConfirmService } from '@ecoinsoft/core-frontend/src/lib/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import { ProjectService } from 'app/services/project.service';

import { AbstractGrid, DataResponse, Pagination } from '@ecoinsoft/core-frontend/src/public-api';
import { AppColumn } from '@ecoinsoft/core-frontend/src/lib/model/app-column';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent extends AbstractGrid implements OnInit {
  searchBox = new FormControl();
  @ViewChild(MatTable, {static: false}) itemTable: MatTable<any>;


  paginationChanged = new EventEmitter<Pagination>();
  pageSizeOptions: number[] = [  10, 25, 50, 100, 500];
  pageSize = 10 ;

  displayedColumns: string[] = ['projectName' , 'totalReceived' , 'totalExpanse' , 'balance' , 'complete','responsibleBy','id'] ;

  pg: Pagination = {};

  constructor
  (
    private serviceAPI: ProjectService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) {super(serviceAPI, loader, { isLoad: false }); }

  ngOnInit() {
     this.list(this.pagination)
     this.search()
  }
    // listen from valueChange observable of control and perform search operation
  private search() {
    this.searchBox.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
        this.list(this.pagination , {projectName  :value});   
    });
  }

  getcolumn(): AppColumn[] {
    return [
      
    ];
  }

  delete(rec, val) {
    this.confirmService.confirm({ title: 'Confirm', message: 'Are you sure to delete '+rec.projectName+' ?' })
    .subscribe(res => {
      if (res) {
        this.service.delete(val).subscribe(res => {
          // Delete suucess, then call get api again.
          this.list(this.pagination);
        });
      } else return;
    });
  }

 


  loadPagiantion(event) {
    console.log(event);

    this.pg.max = event.pageSize;
    this.pg.offset = event.pageIndex * event.pageSize;
    this.list(this.pg);
  }

}
