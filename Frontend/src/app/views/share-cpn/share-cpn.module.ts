import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { SharedMaterialModule } from '@hanumantech/core-frontend/src/public-api';


import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeAutocompleteComponent } from './employee-autocomplete/employee-autocomplete.component';
import { UserAutocompleteComponent } from './user-autocomplete/user-autocomplete.component';
import { ProjectAutocompleteComponent } from './project-autocomplete/project-autocomplete.component';
import { TransactionTypeAutocompleteComponent } from './transaction-type-autocomplete/transaction-type-autocomplete.component';
import { ExpanseItemAutocompleteComponent } from './expanse-item-autocomplete/expanse-item-autocomplete.component';

const components=[
  ProfileImageComponent, 
  EmployeeAutocompleteComponent,
  ProjectAutocompleteComponent,
  TransactionTypeAutocompleteComponent,
  UserAutocompleteComponent, 
  ExpanseItemAutocompleteComponent
  
]

@NgModule({
  declarations:components,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    SharedMaterialModule
  ],  
  exports:components
})
export class ShareCpnModule { }
