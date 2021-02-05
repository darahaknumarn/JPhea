import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractRestService, HttpService } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class TodoService  extends AbstractRestService {
  store=[]
  getUrl(): string {
    return ApiEndpoint.Todo
  }

  constructor(private http : HttpService) {
    super(http);
  }
  search(title?){
    let p = new HttpParams()
    p = p.append( "sort","isImportant").append("order" , "desc").append("isClosed" , 'false' );
    if(title){
      p = p.append( "title",title);
    }

    this.list({
      "params":p
    }).subscribe(res=>{
      this.store = res.data
    })
  }
}
