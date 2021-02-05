import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page404RoutingModule } from './page-404-routing.module';
import { PageNotFoundComponent } from './page-404/page-404.component';
import { SharedMaterialModule } from '@ecoinsoft/core-frontend/src/lib/shared/shared-material.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    Page404RoutingModule,
    SharedMaterialModule,
  ]
})
export class Page404Module { }
