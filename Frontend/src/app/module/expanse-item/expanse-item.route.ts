import { Routes } from '@angular/router';
import { ExpanseItemListComponent } from './expanse-item-list/expanse-item-list.component';
import { ExpanseItemFormComponent } from './expanse-item-form/expanse-item-form.component';

export const routes: Routes = [
  { 
    path: '', 
    component: ExpanseItemListComponent, 
    data: { title: 'List', breadcrumb: 'List' } 
  },
  {
    path: "add",
    component: ExpanseItemFormComponent,
    data: { title: 'Form', breadcrumb: 'New' } 
  },
  {
    path: "update/:id",
    component: ExpanseItemFormComponent,
    data: {title: 'Edit', breadcrumb: 'Edit'}
  }
];
