import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { AbstractRestService, DataResponse, HttpService } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashbordService extends AbstractRestService{
  getUrl(): string {
    return ApiEndpoint.Dashboard
  }

  constructor
  (private http : HttpService) {
    super(http);
  }
  projectSummary():Observable<DataResponse>{
    return this.http.get<DataResponse>(this.getUrl()+"/projectSummary"  )

  }
}
