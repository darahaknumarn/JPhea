import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const routes: Routes = [
  { 
    path: '', 
    component: EmployeeListComponent, 
    data: { title: 'List', breadcrumb: 'List' } 
  },
  {
    path: "add",
    component: EmployeeFormComponent,
    data: { title: 'Form', breadcrumb: 'New' } 
  },
  {
    path: "update/:id",
    component: EmployeeFormComponent,
    data: {title: 'Edit', breadcrumb: 'Edit'}
  }
];
