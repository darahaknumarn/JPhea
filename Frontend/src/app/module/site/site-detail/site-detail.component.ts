import { Component, OnInit } from '@angular/core';
import { SiteService } from 'app/services/site.service';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/public-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.scss']
})
export class SiteDetailComponent implements OnInit {

  siteId: number;
  site: any;

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
        this.loader.close()
      }
    }, err => this.loader.close())
  }

}
