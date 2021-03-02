import { Routes } from '@angular/router';
import { NewDashbaordComponent } from './new-dashbaord/new-dashbaord.component';


export const routes: Routes = [
  { 
    path: '', 
    component: NewDashbaordComponent, 
    data: { title: 'List', breadcrumb: 'List' } 
  }
];