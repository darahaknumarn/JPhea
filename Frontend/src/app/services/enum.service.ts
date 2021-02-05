import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRestService, HttpService, IRequestOptions } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class EnumService extends AbstractRestService {
  getUrl(): string {
    return ApiEndpoint.EnumationAPI
  }
  store: [];
  constructor(private httpService: HttpService) {
    super(httpService)
  }

  listData(type, name?) {
    let params = new HttpParams().append('eType', type);
    if (name) {
      params = params.append('name', name)
    }

    const rq: IRequestOptions = {

      params: params
    };
    this.list(rq).subscribe(res => {
      this.store = res.data
    });
  }


}
