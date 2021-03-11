import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { AbstractRestService, DataResponse, HttpService } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

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

  public getProjectByStatus(isStatus: Boolean) {
    return this.http.get<DataResponse>(this.getUrl()+"/projectReport", this.setParams('isStatus', isStatus))
  }

  public getProjectByType(isProjectType: Boolean) {
    return this.http.get<DataResponse>(this.getUrl()+"/projectReport", this.setParams("isProjectType", isProjectType))
  }

  public getProjectByLocation(isLocation: Boolean) {
    return this.http.get<DataResponse>(this.getUrl()+"/projectReport", this.setParams("isLocation", isLocation))
  }

  public getProjectByState(isState: Boolean) {
    return this.http.get<DataResponse>(this.getUrl()+"/projectReport", this.setParams("isState", isState))
  }

  public getProjectByFinance(isFinance: Boolean) {
    return this.http.get<DataResponse>(this.getUrl()+"/projectReport", this.setParams("isFinance", isFinance))
  }

  // Set params
  private setParams(key: string, value) {
    const params = {
      params: new HttpParams().set(key, value)
    }
    if(params) {
      return params
    }
  }
}
