import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { ImportFormComponent } from './import-form/import-form.component';
import { ImportListComponent } from './import-list/import-list.component';
import { RouterModule } from '@angular/router';
import { ImportRoutes } from './import.routing.module';
import { ImportViewComponent } from './import-view/import-view.component';
import { SharedMaterialModule, SharedComponentsModule, SharedModule, SharedPipesModule } from '@ecoinsoft/core-frontend/src/public-api';
import { DirectivesModule } from './file-drag-drop/directives.module';

@NgModule({
  declarations: [ImportFormComponent, ImportListComponent, ImportViewComponent],
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
    RouterModule.forChild(ImportRoutes)
  ]
})
export class ImportModule { }
