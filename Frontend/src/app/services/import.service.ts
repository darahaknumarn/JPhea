import { Injectable } from '@angular/core';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';
import { AbstractRestService, HttpService, DataResponse } from '@ecoinsoft/core-frontend/src/public-api';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImportService extends AbstractRestService {
  
  getUrl(): string {
    return ApiEndpoint.ImportAPI
  }

  constructor(private httpService: HttpService) { 
    super(httpService)
  }

  importFile(file: any) {
    const formData = new FormData()
    formData.append('filesName', file[0])
  
    return this.httpService.post<DataResponse>(ApiEndpoint.UploadFileAPI, formData);
  }

  downloadFileTemplet() {
    return this.httpService.get(ApiEndpoint.FileTemplateAPI, {
      responseType: 'blob'
    });
  }
}
