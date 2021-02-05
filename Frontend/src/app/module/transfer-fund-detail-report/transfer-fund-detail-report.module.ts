import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferFundDetailReportRoutingModule } from './transfer-fund-detail-report-routing.module';
import {TransferFundDetailReportComponent} from './transfer-fund-detail-report/transfer-fund-detail-report.component';
import {MatCardModule} from '@angular/material/card';
import {ShareCpnModule} from '../../views/share-cpn/share-cpn.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedComponentsModule} from '@ecoinsoft/core-frontend/src/lib/shared/components/shared-components.module';

import {SharedMaterialModule, SharedModule, SharedPipesModule} from '@ecoinsoft/core-frontend/src/public-api';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [TransferFundDetailReportComponent],
  imports: [
    CommonModule,
    TransferFundDetailReportRoutingModule,

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
export class TransferFundDetailReportModule { }
