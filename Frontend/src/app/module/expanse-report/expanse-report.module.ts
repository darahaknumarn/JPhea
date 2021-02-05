import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpanseReportRoutingModule } from './expanse-report-routing.module';
import { ExpanseReportComponent } from './expanse-report/expanse-report.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedMaterialModule, SharedComponentsModule, SharedModule, SharedPipesModule } from '@ecoinsoft/core-frontend/src/public-api';
import { TranslateModule } from '@ngx-translate/core';
import { ShareCpnModule } from 'app/views/share-cpn/share-cpn.module';


@NgModule({
  declarations: [ExpanseReportComponent],
  imports: [
    CommonModule,
    ExpanseReportRoutingModule,
  
    SharedMaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FlexLayoutModule,
    SharedModule,
    SharedPipesModule,
    TranslateModule,
    ShareCpnModule,
    FormsModule
  ]
})
export class ExpanseReportModule { }
