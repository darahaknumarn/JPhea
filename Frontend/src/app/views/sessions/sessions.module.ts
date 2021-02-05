import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from '@ecoinsoft/core-frontend/src/lib/shared/shared-material.module';

import { FlexLayoutModule } from '@angular/flex-layout';


import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';

import { SignupComponent } from './signup/signup.component';
import { SessionsRoutes } from "./sessions.routing";
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { Signup2Component } from './signup2/signup2.component';
import { Signup3Component } from './signup3/signup3.component';
import { Signup4Component } from './signup4/signup4.component';

import { SigninComponent } from './signin/signin.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    MatProgressBarModule,
    

    RouterModule.forChild(SessionsRoutes)  
 
  ],
  declarations: [ForgotPasswordComponent, LockscreenComponent, SignupComponent, NotFoundComponent, ErrorComponent, Signup2Component, Signup3Component, Signup4Component, SigninComponent],
 
})
export class SessionsModule { }
