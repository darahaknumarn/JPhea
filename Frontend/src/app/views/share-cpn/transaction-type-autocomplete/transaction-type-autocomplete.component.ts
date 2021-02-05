import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EnumerationType } from 'app/model/enum/enumeration-type';
import { EnumService } from 'app/services/enum.service';
import { AutoCompleteBase } from '../auto-complete-base';

@Component({
  selector: 'app-transaction-type-autocomplete',
  templateUrl: './transaction-type-autocomplete.component.html',
  styleUrls: ['./transaction-type-autocomplete.component.scss']
})
export class TransactionTypeAutocompleteComponent extends AutoCompleteBase implements OnInit {

  @Output() onSelected = new EventEmitter<any>();
  @Input() label: any;

  display(option: any) {
    return option?.name
  }

  constructor(public service: EnumService) {
    super(service  );
  }
  ngOnInit() {
    this.ctl.valueChanges.subscribe(value => {
      this.service.listData(EnumerationType.TRANSACTIONTYPE ,  value);
    });
    this.service.listData(EnumerationType.TRANSACTIONTYPE);
    if (!this.label) {
      // this.label = this.defaultLabel;
   }
  }



}
