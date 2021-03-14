import { Component, OnInit } from '@angular/core';
import { SiteService } from 'app/services/site.service';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/public-api';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.scss']
})
export class SiteDetailComponent implements OnInit {

  siteId: number;
  site: any;
  // show = false;
  // buttonName = 'Show';
  displayedColumns: string[] = ['siteName', 'adminCode', 'hubSite'];
  dataSource: MatTableDataSource<{}>;

  constructor(
    private siteService: SiteService,
    private loader: AppLoaderService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.siteId = this.route.snapshot.params['id'];

    if (this.siteId){
      this.showDetails();
    }
  }

  showDetails() {
    this.loader.open()
    this.siteService.get(this.siteId).subscribe(res => {
      if (res['statusCode'] === '1') {
        this.site = res['data'];
        this.dataSource = new MatTableDataSource(this.site?.child);
        this.loader.close()
      }
    }, err => this.loader.close())
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
