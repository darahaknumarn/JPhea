import { Routes } from '@angular/router';
import { ImportListComponent } from './import-list/import-list.component';
import { ImportFormComponent } from './import-form/import-form.component';
import { ImportViewComponent } from './import-view/import-view.component';


export const ImportRoutes: Routes = [
  { 
    path: '', 
    component: ImportFormComponent, 
    data: { title: 'Form', breadcrumb: 'New' } 
  },
  {
    path: "list",
    component: ImportListComponent,
    data: { title: 'List', breadcrumb: 'Success' } 
  },
  {
    path: "view/:id",
    component: ImportViewComponent,
    data: {title: 'View', breadcrumb: 'View'}
  }
];