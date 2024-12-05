import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Poshortclose3levelService {

  constructor(private http: HttpClient) { }

  load(empid: any) {
    return this.http.get('http://localhost:4000/POShortClose3level/load?empid=' + empid)
  }
  table() {
    return this.http.get('http://localhost:4000/POShortClose3level/table')
  }
  approve(data:any){
    return this.http.put('http://localhost:4000/POShortClose3level/approve',data)
  }
}
