import { Injectable } from '@angular/core';
import { AbstractRestService, HttpService } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';
import { constructor } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProjectExpanseService extends AbstractRestService{
  
  getUrl(): string {
    return ApiEndpoint.ProjectExpanse
  }

  constructor(private httpService: HttpService) { 
    super(httpService)
  }
}