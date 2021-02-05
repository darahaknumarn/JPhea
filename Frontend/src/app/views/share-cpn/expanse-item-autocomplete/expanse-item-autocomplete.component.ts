import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExpanseItemService } from 'app/services/expanse-item.service';
import { AutoCompleteBase } from '../auto-complete-base';
import { AutoCompleteBaseComponent } from '../auto-complete-base/auto-complete-base.component';

@Component({
  selector: 'app-expanse-item-autocomplete',
  templateUrl: './expanse-item-autocomplete.component.html',
  styleUrls: ['./expanse-item-autocomplete.component.scss']
})
export class ExpanseItemAutocompleteComponent extends AutoCompleteBase {

  @Output()  onSelected  = new  EventEmitter<any>();
  display(option): any {
  }
  constructor(
    public service: ExpanseItemService
  ) {

    super(service)
  }

  displayFn(value) {


    if (value) {
      return value.name
    }
  }

}
