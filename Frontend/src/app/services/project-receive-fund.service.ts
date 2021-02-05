import { Injectable } from '@angular/core';
import { AbstractRestService, HttpService } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class ProjectReceiveFundService  extends AbstractRestService{
  
  getUrl(): string {
    return ApiEndpoint.ProjectReceiveFund
  }

  constructor(private httpService: HttpService) { 
    super(httpService)
  }
}
