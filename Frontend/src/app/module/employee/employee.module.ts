import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '@ecoinsoft/core-frontend/src/lib/shared/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '@ecoinsoft/core-frontend/src/lib/shared/components/shared-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {SharedModule} from '@ecoinsoft/core-frontend/src/lib/shared/shared.module'
import { SharedPipesModule } from '@ecoinsoft/core-frontend/src/lib/shared/pipes/shared-pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { RouterModule } from '@angular/router';
import { routes } from './employee.route';
import { EmployeeListComponent } from './employee-list/employee-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FlexLayoutModule,
    SharedModule,
    SharedPipesModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeeListComponent, EmployeeFormComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  entryComponents: [EmployeeListComponent, EmployeeFormComponent] 
})
export class EmployeeModule { }
