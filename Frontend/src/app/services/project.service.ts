import { Injectable } from '@angular/core';
import { HttpService } from '@ecoinsoft/core-frontend/src/lib/http/http.service';
import { HttpParams } from '@angular/common/http';
import { AbstractRestService, IRequestOptions } from '@ecoinsoft/core-frontend/src/lib/http/abstract-rest.service';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends AbstractRestService {

  getUrl(): string {
    return ApiEndpoint.ProjectAPI
  }
  store: [];
  constructor(private httpService: HttpService) {
    super(httpService)
  }

  listData(name?) {
    let params = new HttpParams();
    if (name) {
      params = params.append('projectName', name);
    }
    const rq: IRequestOptions = {
    
      params: params
    };
    this.list( rq).subscribe(res => {
      this.store = res.data
    });
  }

}