import { Injectable } from '@angular/core';
import { DataResponse, HttpService } from '@ecoinsoft/core-frontend/src/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpService) { }

  listDailySummaryReport( startDate , endDate): Observable<DataResponse>{
   return this.http.get<DataResponse>("/report/dailySummaryReport", {
      params:{
        startDate:startDate , 
        endDate: endDate
      }
    })
  }
}
