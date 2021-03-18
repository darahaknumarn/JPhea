import { Component, OnInit } from '@angular/core';
import { SiteService } from 'app/services/site.service';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/public-api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  displayedColumns: string[] = ['siteName', 'adminCode', 'hubSite', 'Action'];
  dataSource: MatTableDataSource<{}>;

  constructor(
    private siteService: SiteService,
    private loader: AppLoaderService,
    private route: ActivatedRoute, 
    private router : Router
    ) {

  // override the route reuse strategy
  this.router.routeReuseStrategy.shouldReuseRoute = function(){
    return false;
 }

 this.router.events.subscribe((evt) => {
    if (evt instanceof NavigationEnd) {
       // trick the Router into believing it's last link wasn't previously loaded
       this.router.navigated = false;
       // if you need to scroll back to top, here is the right place
       window.scrollTo(0, 0);
    }
});

     }

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
        console.log(this.site?.child);
        
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
  viewSite(id){
    this.router.navigateByUrl("/site/view/"+id)
    this.siteId = id
    this.showDetails()
  }
  

}
