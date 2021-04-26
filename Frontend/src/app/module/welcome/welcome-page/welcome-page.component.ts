import { Component, OnInit } from '@angular/core';
import {Environment} from '@hanumantech/core-frontend/src/lib/environments/environment';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor( public env: Environment) { }

  ngOnInit() {
  }

}
