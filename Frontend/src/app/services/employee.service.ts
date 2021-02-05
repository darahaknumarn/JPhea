import { Injectable } from '@angular/core';
import { HttpService } from '@ecoinsoft/core-frontend/src/lib/http/http.service';
import { DataResponse } from '@ecoinsoft/core-frontend/src/lib/model/data-response';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { AbstractRestService } from '@ecoinsoft/core-frontend/src/lib/http/abstract-rest.service';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends AbstractRestService{

  getUrl(): string {
    return ApiEndpoint.Employee
  }
  store:[] ; 
  constructor(private httpService: HttpService) { 
    super(httpService)
  }
  listData(name?){
  
    
      let params =new HttpParams();
      if(name){
        params= params.append('name' , name);
      }
    
      this.list({params: params} ).subscribe(data=>{
        this.store = data.data
      })
  }
 }