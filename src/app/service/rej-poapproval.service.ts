import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RejPOApprovalService {

  constructor(private http: HttpClient) { }
  Supplier() {
    return this.http.get('http://localhost:4000/rejPOApproval/supplier')
  }
  allSupplier(LocationId: any) {
    return this.http.get('http://localhost:4000/rejPOApproval/All_Supplier?LocationId=' + LocationId)
  }
  oneSupplier(LocationId: number, supid: number) {
    return this.http.get('http://localhost:4000/rejPOApproval/supplierid?LocationId=' + LocationId + '&supid=' + supid)
  }
  Approve(data:any) {
    return this.http.post('http://localhost:4000/rejPOApproval/Approve',data)
  }
}
