import { Injectable } from '@angular/core';
import { AbstractRestService } from '@ecoinsoft/core-frontend/src/lib/http/abstract-rest.service';
import { HttpService } from '@ecoinsoft/core-frontend/src/lib/http/http.service';
import { DataResponse } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProjectTransferService extends AbstractRestService {
  getUrl(): string {
    return ApiEndpoint.ProjectTransfer
  }

  constructor(private httpService: HttpService) { 
    super(httpService)
  }
  getLastBalance(fromProjectId , toProjectId):Observable<DataResponse>{
   return  this.httpService.get<DataResponse>(ApiEndpoint.ProjectTransfer+'/getLastBalance',{
     params:{
       fromProjectId: fromProjectId, 
       toProjectId : toProjectId 
     }
   })
  }
}
