import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditdaysApprovalService {

  constructor(private http: HttpClient) { }

  load(empid: any) {
    return this.http.get('http://localhost:4000/CreditdaysApproval/load?empid=' + empid)
  }

  table() {
    return this.http.get('http://localhost:4000/CreditdaysApproval/table')
  }

  approve(data: any[]) {
    console.log(data, 'approve');

    return this.http.put('http://localhost:4000/CreditdaysApproval/approve', data)
  }

  reject(data: any[]) {
    console.log(data, 'reject');
    return this.http.put('http://localhost:4000/CreditdaysApproval/reject', data)
  }
}
