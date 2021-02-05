import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRestService, DataResponse, HttpService, IRequestOptions } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class SecUserService extends AbstractRestService{

  getUrl(): string {
    return '/api/secusers';
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
      
      const header = new HttpHeaders().set('X-ODP-SPECIAL-1', '12c15344d6d24525914383b23505c622');
    const rq: IRequestOptions = {
      headers : header, 
      params : params
    };
    this.httpService.get<DataResponse>('/api/secusers?', rq).subscribe(res=>{
      this.store = res.data
    });
  }

}
