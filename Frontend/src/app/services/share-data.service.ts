import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataName=new BehaviorSubject('');
  private dataDescription=new BehaviorSubject('');
  private dataId=new BehaviorSubject('');
  private dataStatus= new BehaviorSubject('');
  //The BehaviorSubject holds the value that needs to be shared with other components

  shareMiscellaneousName=this.dataName.asObservable();
  shareMiscellaneousDescription=this.dataDescription.asObservable();
  shareId=this.dataId.asObservable();
  shareStatus=this.dataStatus.asObservable();
  constructor() { }

  nextMessageName(dataName?:string){
    this.dataName.next(dataName);
  }

  nextMessageDescription(dataDescription?:string){
    this.dataDescription.next(dataDescription);
  }

  getId(id?:any){
    this.dataId.next(id);
  }

  nextStatusData(statusName:string){
    this.dataStatus.next(statusName);
  }

}
