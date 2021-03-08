import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedMaterialModule, SharedComponentsModule, SharedModule, SharedPipesModule } from '@ecoinsoft/core-frontend/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule } from '@angular/router';
import { routes } from '../new-dashbaord/new-dashbaord.route';
import { NewDashbaordComponent } from './new-dashbaord/new-dashbaord.component';
import { LeafletMapReportComponent } from './leaflet-map-report/leaflet-map-report/leaflet-map-report.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { BubbleChartReportComponent } from './bubble-chart-report/bubble-chart-report/bubble-chart-report.component';
import { DonutChartStatusComponent } from './donut-chart/donut-chart-status/donut-chart-status.component';
import { DonutChartLocationComponent } from './donut-chart/donut-chart-location/donut-chart-location.component';
import { DonutChartStateComponent } from './donut-chart/donut-chart-state/donut-chart-state.component';

@NgModule({
  declarations: [NewDashbaordComponent, LeafletMapReportComponent, BubbleChartReportComponent, DonutChartStatusComponent, DonutChartLocationComponent, DonutChartStateComponent],
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
    LeafletModule,
    RouterModule.forChild(routes)
  ],
  providers :[
    DatePipe
  ]
})
export class NewDashbaoardModule { }
