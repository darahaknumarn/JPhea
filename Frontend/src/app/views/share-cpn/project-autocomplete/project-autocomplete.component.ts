import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ProjectService } from 'app/services/project.service';
import { AutoCompleteBase } from '../auto-complete-base';


@Component({
  selector: 'app-project-autocomplete',
  templateUrl: './project-autocomplete.component.html',
  styleUrls: ['./project-autocomplete.component.scss']
})
export class ProjectAutocompleteComponent extends AutoCompleteBase implements OnInit {

  @Output() onSelected: EventEmitter<any> = new EventEmitter();
  @Input() label: any = 'Project';

  constructor(
    public service: ProjectService
  ) {
    super(service)
  }
  display(item) {
    if (item) {
      return item.projectName
    }

  }

}
