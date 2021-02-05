import { Injectable } from '@angular/core';
import { HttpService } from '@ecoinsoft/core-frontend/src/lib/http/http.service';
import { DataResponse } from '@ecoinsoft/core-frontend/src/lib/model/data-response';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { AbstractRestService } from '@ecoinsoft/core-frontend/src/lib/http/abstract-rest.service';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';
import { EnumerationType } from 'app/model/enum/enumeration-type';

@Injectable({
  providedIn: 'root'
})
export class ExpanseItemTypeService extends AbstractRestService{
  store =[]; 
  getUrl(): string {
    return ApiEndpoint.EnumationAPI
  }

  constructor(private httpService: HttpService) { 
    super(httpService)
  }
  
  listData(name?){
    console.log(name);
    
      let params =new HttpParams().append('eType',EnumerationType.EXPANSEITEMTYPE);
      if(name){
       params= params.append('name' , name)
      }
    
      this.list({params: params} ).subscribe(data=>{
        this.store = data.data
      })
  }
 }