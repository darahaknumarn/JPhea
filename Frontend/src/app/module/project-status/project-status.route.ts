import { Routes } from '@angular/router';
import { ProjectStatusListComponent } from './project-status-list/project-status-list.component';
import { ProjectStatusFormComponent } from './project-status-form/project-status-form.component';

export const routes: Routes = [
  { 
    path: '', 
    component: ProjectStatusListComponent, 
    data: { title: 'List', breadcrumb: 'List' } 
  },
  {
    path: "add",
    component: ProjectStatusFormComponent,
    data: { title: 'Form', breadcrumb: 'New' } 
  },
  {
    path: "update/:id",
    component: ProjectStatusFormComponent,
    data: {title: 'Edit', breadcrumb: 'Edit'}
  }
];
