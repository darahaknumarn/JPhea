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
import { ExpanseItemTypeFormComponent } from './expanse-item-type-form/expanse-item-type-form.component';
import { RouterModule } from '@angular/router';
import { routes } from './expanse-item-type.route';
import { ExpanseItemTypeListComponent } from './expanse-item-type-list/expanse-item-type-list.component';

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
  declarations: [ExpanseItemTypeListComponent, ExpanseItemTypeFormComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  entryComponents: [ExpanseItemTypeListComponent, ExpanseItemTypeFormComponent] 
})
export class ExpanseItemTypeModule { }
