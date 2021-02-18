import { Routes } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteDetailComponent } from './site-detail/site-detail.component';


export const SiteRoutes: Routes = [
  { 
    path: '', 
    component: SiteListComponent, 
    data: { title: 'List', breadcrumb: 'List' } 
  },
  {
    path: "view/:id",
    component: SiteDetailComponent,
    data: { title: 'View', breadcrumb: 'View' } 
  }
];