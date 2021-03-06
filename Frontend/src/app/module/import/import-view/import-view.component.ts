import { Component, OnInit, ViewChild } from '@angular/core';
import { SiteService } from 'app/services/site.service';
import { AppLoaderService } from '@hanumantech/core-frontend/src/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-import-view',
  templateUrl: './import-view.component.html',
  styleUrls: ['./import-view.component.scss']
})
export class ImportViewComponent implements OnInit {
  importId: number;
  siteId: number;
  site: any;
  displayedColumns: string[] = ['siteName', 'adminCode', 'hubSite'];
  dataSource: MatTableDataSource<{}>;
  // show = false;
  // buttonName = 'Show';

  constructor(
    private siteService: SiteService,
    private loader: AppLoaderService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() { 
    this.siteId = this.route.snapshot.params['id'];

    if (this.siteId) {
      
      this.showDetails()
    }
    
    
  }

  showDetails() {
    this.loader.open()
    this.siteService.get(this.siteId).subscribe(res => {
      if (res['statusCode'] === '1') {
        this.importId = res['data']?.importHistoryId
        this.site = res['data'];
        this.dataSource = new MatTableDataSource(this.site?.child);
        this.loader.close()
      }
    }, err => this.loader.close())
  }


  back() {
    // back route
    this.router.navigate(['/import/list'], {queryParams: {"importId": this.importId}});
  }

  // toggle() {
  //   this.show = !this.show

  //   if(this.show) {
  //     this.buttonName = 'Hide';
  //   }
  //   else {
  //     this.buttonName = 'Show';
  //   }
  // }

}
