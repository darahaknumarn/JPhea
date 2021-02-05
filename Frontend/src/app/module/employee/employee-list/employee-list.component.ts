import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConfirmService } from '@ecoinsoft/core-frontend/src/lib/shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import { EmployeeService } from 'app/services/employee.service';
import { MatTable } from '@angular/material/table';
import { AbstractGrid } from '@ecoinsoft/core-frontend/src/public-api';
import { AppColumn } from '@ecoinsoft/core-frontend/src/lib/model/app-column';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent extends AbstractGrid implements OnInit {
  searchBox = new FormControl();
  @ViewChild(MatTable, {static: false}) itemTable: MatTable<any>;

  constructor
  (
    private serviceAPI: EmployeeService,
    private confirmService: AppConfirmService,
    private loader: AppLoaderService
  ) {super(serviceAPI, loader, { isLoad: false }); }

  ngOnInit() {
     this.list(this.pagination)
     this.search()
  }
    // listen from valueChange observable of control and perform search operation
  private search() {
    this.searchBox.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
        this.list(this.pagination , {code:value});   
    });
  }

  getcolumn(): AppColumn[] {
    return [
      {
        displayName: 'Name', dataIndex: 'name'
      },
      {
        displayName: 'Position', dataIndex: 'position'
      },
      {
        displayName: 'Description', dataIndex: 'description'
      },
      {
        displayName: 'Action', dataIndex: 'id', actionColumn: [
          {
            icon: 'edit',
            link: '/employee/update',
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
