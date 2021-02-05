import { Injectable } from '@angular/core';
import { HttpService } from '@ecoinsoft/core-frontend/src/lib/http/http.service'
import { AbstractRestService } from '@ecoinsoft/core-frontend/src/lib/http/abstract-rest.service';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';
import { HttpParams } from '@angular/common/http';
import { EnumerationType } from 'app/model/enum/enumeration-type';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService extends AbstractRestService{
  store =[]; 
  getUrl(): string {
    return ApiEndpoint.EnumationAPI
  }

  constructor(private httpService: HttpService) { 
    super(httpService)
  }
  
  listData(name?){
    console.log(name);
    
      let params =new HttpParams().append('eType',EnumerationType.PROJECTTYPE);
      if(name){
       params= params.append('name' , name)
      }
    
      this.list({params: params} ).subscribe(data=>{
        this.store = data.data
      })
  }
  getDefault(): Observable<any>{
    let params =new HttpParams().append('eType',EnumerationType.PROJECTTYPE );
    return this.httpService.get("/api/enumerationDefault" , {params : params})
  }
 }