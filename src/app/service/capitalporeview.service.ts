import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CapitalporeviewService {

  constructor(private http: HttpClient) { }

  load(empid: any) {
    return this.http.get('http://localhost:4000/CapitalPOreview/Load?empid=' + empid)
  }

  table() {
    return this.http.get('http://localhost:4000/CapitalPOreview/table')
  }
  review(data: any) {
    return this.http.put('http://localhost:4000/CapitalPOreview/review', data)
  }
}
