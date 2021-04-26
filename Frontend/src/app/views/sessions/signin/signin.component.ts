import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { egretAnimations } from '@hanumantech/core-frontend/src/lib/shared/animations/egret-animations';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, Logger } from '@hanumantech/core-frontend/src/public-api';


const log = new Logger('Login');

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: egretAnimations
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  @ViewChild(MatProgressBar) progressBar: MatProgressBar;

  constructor(private fb: FormBuilder,
    private router: Router,

    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private snack: MatSnackBar
  ) {

    this.createForm();
  }

  ngOnInit() {
  }

  login() {
    if (!this.signinForm.invalid) {
      this.progressBar.mode = 'indeterminate';
      this.authenticationService.login(this.signinForm.value);
      this.progressBar.mode = 'determinate';
    }
  }
  private createForm() {
    const password = new FormControl('', Validators.required);
    this.signinForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: password,
      }
    );
  }
}
