import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '@ecoinsoft/core-frontend/src/lib/shared/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '@ecoinsoft/core-frontend/src/lib/shared/components/shared-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {SharedModule} from '@ecoinsoft/core-frontend/src/lib/shared/shared.module'
import { SharedPipesModule } from '@ecoinsoft/core-frontend/src/lib/shared/pipes/shared-pipes.module';
import { TranslateModule } from '@ngx-translate/core';

import { ProjectTypeFormComponent } from './project-type-form/project-type-form.component';
import { RouterModule } from '@angular/router';
import { routes } from './project-type.route';
import { ProjectTypeListComponent } from './project-type-list/project-type-list.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

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
  declarations: [ProjectTypeListComponent, ProjectTypeFormComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  entryComponents: [ProjectTypeListComponent, ProjectTypeFormComponent] 
})
export class ProjectTypeModule { }
