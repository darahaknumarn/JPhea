import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractGrid, AppLoaderService, AppColumn } from '@ecoinsoft/core-frontend/src/public-api';
import { MatTable } from '@angular/material/table';
import { SiteService } from 'app/services/site.service';
import { AppConfirmService } from '@ecoinsoft/core-frontend/src/lib/shared/services/app-confirm/app-confirm.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ImportService } from 'app/services/import.service';
import {saveAs} from 'file-saver';
const EXCEL = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent extends AbstractGrid implements OnInit {
  @ViewChild(MatTable, {static: false}) itemTable: MatTable<any>;
  @ViewChild('file') fileInput: ElementRef;
  form: FormGroup
  
  constructor
  (
    private siteService: SiteService,
    private confirmService: AppConfirmService,
    private importService: ImportService,
    private loader: AppLoaderService,
    private fb: FormBuilder
  ) {super(siteService, loader) }

  getcolumn(): AppColumn[] {
    return [
      {
        displayName: 'Site Owner', dataIndex: 'siteOwner'
      },
      {
        displayName: 'Admin Code', dataIndex: 'adminCode'
      },
      {
        displayName: 'SRAN Name', dataIndex: 'sRANName'
      },
      {
        displayName: 'BTS Name No Tect', dataIndex: 'bTSNameNoTech'
      },
      {
        displayName: 'Product Type', dataIndex: 'productType'
      },
      {
        displayName: 'Site Category', dataIndex: 'siteCategory'
      },
      {
        displayName: 'Latitude', dataIndex: 'latitude'
      },
      {
        displayName: 'Longitude', dataIndex: 'longitude'
      },
      {
        displayName: 'Action', dataIndex: 'id', actionColumn: [
          {
            icon: 'visibility',
            link: '/site/view',
            tooltip: 'View'
          }
        ]
      }
    ];
  }

  // On start up form of list site
  onForm() {
    this.form = this.fb.group({
      adminCode: [],
      officialSiteName: [],
      hubSite: []
    });
  }

   /**
   * Choose file, then push to document list
   * @param event 
   */
  chooseDocument(event) {
    const file = event.target ? event.target.files : event;
    this.loader.open()

    this.importService.importFile(file).subscribe(res => {
      if (res['statusCode'] === '1') {
        this.loader.close()
        this.resetFile()
        
        this.list(this.pagination)
      }
    }, err => this.loader.close())
  }

  // Export as excel for site's list
  export() {
    this.loader.open()
    const adminCode = this.form.value.adminCode
    const officialSiteName = this.form.value.officialSiteName
    const hubSite = this.form.value.hubSite
    
    this.siteService.exportFile(adminCode, officialSiteName, hubSite).subscribe(res => {
      const file = new File([res], 'site-template', { type: EXCEL });
      saveAs(file);
      this.loader.close()

    }, err => this.loader.close())
  }

  // Search in list site by admin code, site, hub
  search() {
    this.list(this.pagination , {
      adminCode: this.form.value.adminCode,
      officialSiteName: this.form.value.officialSiteName,
      hubSite: this.form.value.hubSite
    }); 
    
  }

  clear() {
    this.abBaseParams = {};
    this.form.reset()

    this.list(this.pagination)
  }

  // Reset file to empty value.
  private resetFile() {
    this.fileInput.nativeElement.value = ''
  }

  ngOnInit(): void {
    this.onForm()
  }

}
