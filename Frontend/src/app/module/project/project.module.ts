import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '@ecoinsoft/core-frontend/src/lib/shared/shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '@ecoinsoft/core-frontend/src/lib/shared/components/shared-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {SharedModule} from '@ecoinsoft/core-frontend/src/lib/shared/shared.module'
import { SharedPipesModule } from '@ecoinsoft/core-frontend/src/lib/shared/pipes/shared-pipes.module';
import { TranslateModule } from '@ngx-translate/core';

import { ProjectFormComponent } from './project-form/project-form.component';
import { RouterModule } from '@angular/router';
import { routes } from './project.route';
import { ProjectListComponent } from './project-list/project-list.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectExpanseComponent } from './project-expanse/project-expanse.component';
import { ProjectTransferComponent } from './project-transfer/project-transfer.component';
import { ProjectReceiveFundComponent } from './project-receive-fund/project-receive-fund.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ProjectCommentComponent } from './project-comment/project-comment.component';
import { ProjectFinanceTransactionComponent } from './project-finance-transaction/project-finance-transaction.component';
import { ChartsModule } from 'ng2-charts';

import { ShareCpnModule } from 'app/views/share-cpn/share-cpn.module';
import { ProjectPrintExpanseComponent } from './project-print-expanse/project-print-expanse.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
    ChartsModule,
    RouterModule.forChild(routes), 
    FileUploadModule, 
    ShareCpnModule,
    ScrollingModule
  ],
  declarations: [ProjectListComponent, ProjectFormComponent, ProjectViewComponent, ProjectExpanseComponent, ProjectTransferComponent, ProjectReceiveFundComponent, ProjectCommentComponent, ProjectFinanceTransactionComponent, ProjectPrintExpanseComponent],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  entryComponents: [ProjectListComponent, ProjectFormComponent] 
})
export class ProjectModule { }
