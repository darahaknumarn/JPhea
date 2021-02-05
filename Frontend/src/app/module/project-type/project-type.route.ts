import { Routes } from '@angular/router';
import { ProjectTypeListComponent } from './project-type-list/project-type-list.component';
import { ProjectTypeFormComponent } from './project-type-form/project-type-form.component';

export const routes: Routes = [
  { 
    path: '', 
    component: ProjectTypeListComponent, 
    data: { title: 'List', breadcrumb: 'List' } 
  },
  {
    path: "add",
    component: ProjectTypeFormComponent,
    data: { title: 'Form', breadcrumb: 'New' } 
  },
  {
    path: "update/:id",
    component: ProjectTypeFormComponent,
    data: {title: 'Edit', breadcrumb: 'Edit'}
  }
];
