import { Injectable } from '@angular/core';
import { AbstractRestService, HttpService } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SiteService extends AbstractRestService {
  getUrl(): string {
    return ApiEndpoint.SiteAPI
  }

  constructor(private httpService: HttpService) { 
    super(httpService)
  }

  exportFile(adminCode: String, officialSiteName: String, hubSite: String) {
    const params = new HttpParams()
        .set("adminCode", `${adminCode}`)
        .set("officialSiteName", `${officialSiteName}`)
        .set("hubSite", `${hubSite}`) 

    return this.httpService.get(ApiEndpoint.ExportFileAPI, {
      params: params,
      responseType: 'blob'
    });
  }
}
