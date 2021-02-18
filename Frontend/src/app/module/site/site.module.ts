import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteDetailComponent } from './site-detail/site-detail.component';
import { SiteListComponent } from './site-list/site-list.component';
import { SharedMaterialModule, SharedComponentsModule, SharedModule, SharedPipesModule } from '@ecoinsoft/core-frontend/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from '../import/file-drag-drop/directives.module';
import { RouterModule } from '@angular/router';
import { SiteRoutes } from './site.routing.module';



@NgModule({
  declarations: [SiteDetailComponent, SiteListComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FlexLayoutModule,
    SharedModule,
    SharedPipesModule,
    TranslateModule,
    DirectivesModule,
    RouterModule.forChild(SiteRoutes)
  ]
})
export class SiteModule { }
