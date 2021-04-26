import { Component, Input, OnInit } from '@angular/core';
import { SecUser } from '@hanumantech/core-frontend/src/public-api';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {
  @Input()userProfile:any;
  constructor() { }

  ngOnInit(): void {
  }

}
