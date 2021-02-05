import { Injectable } from '@angular/core';
import { AbstractRestService, HttpService } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class FinanceTransactionService extends AbstractRestService {
  getUrl(): string {
    return ApiEndpoint.FinanceTransaction
  }

  constructor(private httpService: HttpService) { 
    super(httpService)
  }

}
