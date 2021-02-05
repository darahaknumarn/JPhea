import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '@ecoinsoft/core-frontend/src/lib/shared/components/shared-components.module';
import { SharedPipesModule } from '@ecoinsoft/core-frontend/src/lib/shared/pipes/shared-pipes.module';
import { SharedMaterialModule, SharedModule } from '@ecoinsoft/core-frontend/src/public-api';
import { TranslateModule } from '@ngx-translate/core';
import { routes } from './dashboard.route';
import { ChartsModule } from 'ng2-charts';
import { DashboardProjectBudgetSummaryComponent } from './dashboard-project-budget-summary/dashboard-project-budget-summary.component';
import { DashboardTodoComponent } from './dashboard-todo/dashboard-todo.component';
import { ExpireDirective } from 'app/views/directive/expire.directive';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardProjectSummaryChartComponent } from './dashboard-project-summary-chart/dashboard-project-summary-chart.component';
import { DashboardDaillySummaryChartComponent } from './dashboard-dailly-summary-chart/dashboard-dailly-summary-chart.component';

@NgModule({
  declarations: [DashboardComponent, DashboardProjectBudgetSummaryComponent, DashboardTodoComponent ,ExpireDirective  ,DashboardProjectSummaryChartComponent, DashboardDaillySummaryChartComponent],
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
    NgxEchartsModule,
    RouterModule.forChild(routes)
  ],
  providers :[
    DatePipe
  ]
  
})
export class DashboardModule { }
