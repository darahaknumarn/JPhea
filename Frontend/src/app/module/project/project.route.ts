import { Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectViewComponent } from './project-view/project-view.component';

export const routes: Routes = [
  { 
    path: '', 
    component: ProjectListComponent, 
    data: { title: 'List', breadcrumb: 'List' } 
  },
  {
    path: "add",
    component: ProjectFormComponent,
    data: { title: 'Form', breadcrumb: 'New' } 
  },
  {
    path: "update/:id",
    component: ProjectFormComponent,
    data: {title: 'Edit', breadcrumb: 'Edit'}
  },
  {
    path: "view/:id",
    component: ProjectViewComponent,
    data: {title: 'View', breadcrumb: 'View'}
  }
];
