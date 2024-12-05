import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CODApproveService {

  constructor(private http: HttpClient) { }

  load(LocationId: any) {
    return this.http.get('http://localhost:4000/CODApprove/Load?LocationId=' + LocationId)
  }

  table(LocationId: any) {
    return this.http.get('http://localhost:4000/CODApprove/table?LocationId=' + LocationId)
  }
  approve(data: any) {
    console.log(data);
    
    return this.http.post('http://localhost:4000/CODApprove/approve', data)
  }
}
