import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConfirmService } from '@ecoinsoft/core-frontend/src/lib/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import { ExpanseItemTypeService } from 'app/services/expanse-item-type.service';
import { MatTable } from '@angular/material/table';
import { AbstractGrid } from '@ecoinsoft/core-frontend/src/public-api';
import { AppColumn } from '@ecoinsoft/core-frontend/src/lib/model/app-column';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import { EnumerationType } from 'app/model/enum/enumeration-type';

@Component({
  selector: 'app-expanse-item-type-list',
  templateUrl: './expanse-item-type-list.component.html',
  styleUrls: ['./expanse-item-type-list.component.scss']
})
export class ExpanseItemTypeListComponent extends AbstractGrid implements OnInit {
  searchBox = new FormControl();
  @ViewChild(MatTable, {static: false}) itemTable: MatTable<any>;

  constructor
  (
    private serviceAPI: ExpanseItemTypeService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) {super(serviceAPI, loader, { isLoad: false }); }

  ngOnInit() {
     this.list(this.pagination,{eType:EnumerationType.EXPANSEITEMTYPE})
     this.search()
  }
    // listen from valueChange observable of control and perform search operation
  private search() {
    this.searchBox.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
        this.list(this.pagination , {name:value, eType:EnumerationType.EXPANSEITEMTYPE});   
    });
  }

  getcolumn(): AppColumn[] {
    return [
      {
        displayName: 'Expanse Item Type', dataIndex: 'name'
      },
      {
        displayName: 'Description', dataIndex: 'description'
      },
      {
        displayName: 'Is Active ?', dataIndex: 'isActive', pipe: 'yesno'
      },
      {
        displayName: 'Is Default ?', dataIndex: 'isDefault', pipe: 'yesno'
      },
      {
        displayName: 'Action', dataIndex: 'id', actionColumn: [
          {
            icon: 'edit',
            link: '/expanse-item-type/update',
            tooltip: 'Edit'
          },
          {
            icon: 'delete',
            onClick: (rec , val) => {
              this.delete(rec, val);
            },
            tooltip: 'Delete'
          }
        ]
      }
    ];
  }

  delete(rec, val) {
    this.confirmService.confirm({ title: 'Confirm', message: 'Are you sure to delete?' })
    .subscribe(res => {
      if (res) {
        this.service.delete(val).subscribe(res => {
          // Delete suucess, then call get api again.
          this.list(this.pagination);
        });
      } else return;
    });
  }

}
