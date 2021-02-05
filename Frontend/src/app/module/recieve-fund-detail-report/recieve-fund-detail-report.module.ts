import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecieveFundDetailReportRoutingModule } from './recieve-fund-detail-report-routing.module';
import {ReceiveFundDetailReportComponent} from './recieve-fund-detail-report/receive-fund-detail-report.component';

import {SharedComponentsModule, SharedMaterialModule, SharedModule, SharedPipesModule} from '@ecoinsoft/core-frontend/src/public-api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {ShareCpnModule} from '../../views/share-cpn/share-cpn.module';


@NgModule({
  declarations: [ReceiveFundDetailReportComponent],
  imports: [
    CommonModule,
    RecieveFundDetailReportRoutingModule,


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
export class RecieveFundDetailReportModule { }
