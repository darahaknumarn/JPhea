import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { SharedMaterialModule } from '@hanumantech/core-frontend/src/lib/shared/shared-material.module';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedMaterialModule
  ]
})
export class WelcomeModule { }
