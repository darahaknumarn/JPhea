import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmployeeService } from 'app/services/employee.service';
import { AutoCompleteBase } from '../auto-complete-base';

@Component({
  selector: 'app-employee-autocomplete',
  templateUrl: './employee-autocomplete.component.html',
  styleUrls: ['./employee-autocomplete.component.scss']
})
export class EmployeeAutocompleteComponent extends AutoCompleteBase implements OnInit {

  @Output() onSelected: EventEmitter<any> = new EventEmitter();
  @Input() label: any;


  constructor(
    public service: EmployeeService
  ) {
     super(service)
  }

  display(item) {
    return item?.name
  }


}
