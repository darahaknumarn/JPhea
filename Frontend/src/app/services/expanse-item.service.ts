import { Injectable } from '@angular/core';
import { HttpService } from '@ecoinsoft/core-frontend/src/lib/http/http.service';

import { AbstractRestService } from '@ecoinsoft/core-frontend/src/lib/http/abstract-rest.service';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';
import { HttpParams } from '@angular/common/http';
import { EnumerationType } from 'app/model/enum/enumeration-type';

@Injectable({
  providedIn: 'root'
})
export class ExpanseItemService extends AbstractRestService{
  store:[]; 
  getUrl(): string {
    return ApiEndpoint.ExpanseItem
  }

  constructor(private httpService: HttpService) { 
    super(httpService)
  }
  listData(name?){
    console.log(name);
    
      let params =new HttpParams();
      if(name){
        params= params.append('name' , name);
      }
    
      this.list({params: params} ).subscribe(data=>{
        this.store = data.data
      })
  }
 }