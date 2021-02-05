import { Routes } from '@angular/router';
import { ExpanseItemTypeListComponent } from './expanse-item-type-list/expanse-item-type-list.component';
import { ExpanseItemTypeFormComponent } from './expanse-item-type-form/expanse-item-type-form.component';

export const routes: Routes = [
  { 
    path: '', 
    component: ExpanseItemTypeListComponent, 
    data: { title: 'List', breadcrumb: 'List' } 
  },
  {
    path: "add",
    component: ExpanseItemTypeFormComponent,
    data: { title: 'Form', breadcrumb: 'New' } 
  },
  {
    path: "update/:id",
    component: ExpanseItemTypeFormComponent,
    data: {title: 'Edit', breadcrumb: 'Edit'}
  }
];
