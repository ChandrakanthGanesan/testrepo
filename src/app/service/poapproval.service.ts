import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PoapprovalService {
  private tableURL = 'http://192.168.203.100:4000/poapproval/table'
  private povalueURL = 'http://192.168.203.100:4000/poapproval/povalue'

  constructor(private http: HttpClient) { }
  Location(LocationID: number) {
    return this.http.get('http://192.168.203.100:4000/poapproval/Location?empid=1')
  }

  Location1() {
    return this.http.get('http://192.168.203.100:4000/poapproval/Location1')
  }

  supplier() {
    return this.http.get('http://192.168.203.100:4000/poapproval/supplier')
  }

  table(type: any, LocationId: any, supid: any) {
    let params = new HttpParams()
      .set('type', type)
      .set('LocationId', LocationId)
      .set('supid', supid)
    return this.http.get<any>(this.tableURL, { params })
  }

  povalue(type: any, POID: any) {
    let params = new HttpParams()
      .set('type', type)
      .set('POID', POID);
    return this.http.get<any>(this.povalueURL, { params });
  }
  Approve(data:any){
    return this.http.post("http://192.168.203.100:4000/poapproval/approve",data)
  }

  oldpo1(rawmatid:any){
    return this.http.get('http://192.168.203.100:4000/poapproval/oldpo1?rawmatid='+rawmatid)
  }
  oldpo2(rawmatid:any){
    return this.http.get('http://192.168.203.100:4000/poapproval/oldpo2?rawmatid='+rawmatid)
  }
  
}
