import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AbstractGrid, AppColumn, AppLoaderService, Pagination } from '@ecoinsoft/core-frontend/src/public-api';
import { AppConfirmService } from '@ecoinsoft/core-frontend/src/lib/shared/services/app-confirm/app-confirm.service';
import { ImportService } from 'app/services/import.service';
import {ActivatedRoute, Router } from '@angular/router';
import { SiteService } from 'app/services/site.service';
import { HttpParams } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-import-list',
  templateUrl: './import-list.component.html',
  styleUrls: ['./import-list.component.scss']
})
export class ImportListComponent implements OnInit {

  dataHistroy: any;
  sites: any[] = [];
  importId: number;
  @ViewChild('file') fileInput: ElementRef;
  dataSource: MatTableDataSource<Site>;
  @ViewChild(MatTable, {static: false}) itemTable: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageSizeOptions: number[] = [10, 25, 50, 100, 500];
  pageSize = 10 ;
  totalPage: number;
  pageIndex = 1;
  pageStart = 0;
  pagelimit = 10;
  baseParams: {};
  displayedColumns: string[] = ['SiteOwner', 'AdminCode', 'SRANName','BTSNameNoTect', 'ProductType','SiteCategory', 'Latitude', 'Longitude', 'Action'] ;


  constructor
  (
    private importService: ImportService,
    private siteService: SiteService,
    private confirmService: AppConfirmService,
    private router: Router,
    private loader: AppLoaderService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.importId = +this._route.snapshot.queryParamMap.get('importId');

    if(this.importId) {
      this.getFileDetail(this.importId);
      this.getSiteList(this.importId)
    }
  }

  /**
   * Choose file, then push to document list
   * @param event 
   */
  chooseDocument(event) {    
    const file = event.target ? event.target.files : event;
    this.importService.importFile(file).subscribe(res => {
      if (res['statusCode'] === '1') {
        this.resetFile()
        this.importId = res['data']?.id;

        // redirect import list
        this.router.navigate(['/import/list'], {queryParams: {"importId": this.importId}});
        this.getFileDetail(this.importId)
        this.getSiteList(this.importId)
      }


    }, err => console.error("Unexpected error"))
  }

  getNext(event) {
    this.pageIndex = event.pageSize * event.pageIndex + 1;
    const pageStart = event.pageSize * event.pageIndex;
    const pageSizeOptions = event.pageSize;
    this.pagelimit = pageSizeOptions;
    
    this.getSiteList(this.importId, this.pagelimit, pageStart)
  }

  // Get data import history by id of file import success.
  private getFileDetail(id: number) {
    this.importService.get(id).subscribe(res => {
      if (res) {
        this.dataHistroy = res['data']
      }
    });
    
  }

  // Get site list base on import history id
  private getSiteList(importId: number, max: number = 10, offset: number = 0) {
    this.loader.open()
    const params = {
      params : new HttpParams()
      .set("importHistoryId", `${importId}`)
      .set("max", `${max}`)
      .set("offset", `${offset}`)
    }
    this.siteService.list(params).subscribe(res => {
      if (res['statusCode'] === '1') {
        this.sites = res['data']
        this.listDataSource(this.sites, res)
        this.loader.close()
      }
    }, err => this.loader.close());
  }

   // Reset file to empty value.
  private resetFile() {
    this.fileInput.nativeElement.value = ''
  }
  
   /**
   * Get data on Site list into data source.
   * @param requestItemList
   * @param res
   */
  private listDataSource(requestItemList: any, res: any) {
    this.dataSource = new MatTableDataSource(requestItemList);
    this.dataSource.sort = this.sort;
    this.totalPage = res['total'];
  }

}

export interface Site { }