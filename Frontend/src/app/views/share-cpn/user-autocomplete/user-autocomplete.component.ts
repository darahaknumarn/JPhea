import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SecUserService } from 'app/services/sec-user.service';
import { AutoCompleteBase } from '../auto-complete-base';


@Component({
  selector: 'app-user-autocomplete',
  templateUrl: './user-autocomplete.component.html',
  styleUrls: ['./user-autocomplete.component.scss']
})
export class UserAutocompleteComponent extends AutoCompleteBase implements OnInit {

  @Output() onSelected = new EventEmitter<any>();
  label = 'Employee'
  display(option: any) {
    if (option) {
      return option.firstName + ' ' + option.lastName
    }

  }
  constructor(
    public service: SecUserService
  ) {
    super(service  );

  }

}
