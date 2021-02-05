import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancaiilTransactionReportComponent } from './financaiil-transaction-report/financaiil-transaction-report.component';
import { RouterModule } from '@angular/router';
import { routes } from './financail-transaction-report.routing';
import { SharedMaterialModule } from '@ecoinsoft/core-frontend/src/lib/shared/shared-material.module';
import { SharedComponentsModule } from '@ecoinsoft/core-frontend/src/lib/shared/components/shared-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedPipesModule } from '@ecoinsoft/core-frontend/src/lib/shared/pipes/shared-pipes.module';
import { SharedModule } from '@ecoinsoft/core-frontend/src/public-api';
import { TranslateModule } from '@ngx-translate/core';
import { ShareCpnModule } from 'app/views/share-cpn/share-cpn.module';
import { PrintLayoutComponent } from './print-layout/print-layout.component';


@NgModule({
  declarations: [FinancaiilTransactionReportComponent, PrintLayoutComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FlexLayoutModule,
    SharedModule,
    SharedPipesModule,
    TranslateModule,
    ShareCpnModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class FinancailTransactionReportModule { }
