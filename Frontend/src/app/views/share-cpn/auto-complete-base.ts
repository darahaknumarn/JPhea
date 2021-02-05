import { EventEmitter, Injectable, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export  abstract class AutoCompleteBase {

  ctl = new FormControl();
  abstract  onSelected: EventEmitter<any> ;


  constructor(public service: any     ) {

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.ctl.valueChanges.subscribe(value => {
      this.service.listData(value);
      this.onSelected.emit(null)
    });
    this.service.listData();

  }

  selected(value) {
    this.service.listData();
    this.onSelected.emit(value)
  }



}
