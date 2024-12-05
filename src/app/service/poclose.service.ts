import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PocloseService {

  constructor(private http: HttpClient) { }

  Load() {
    return this.http.get('http://192.168.203.100:4000/POClose/Load')
  }
  supplier(type: any, locationid: any, from: any, to: any) {
    return this.http.get('http://192.168.203.100:4000/POClose/Supplier?type=' + type + '&Locationid=' + locationid + '&From=' + from + '&To=' + to + '')
  }
  table(type: any, Locid: any, supid: any, typeid: any, from: any, to: any, subconid: any) {
    return this.http.get('http://192.168.203.100:4000/POClose/Table?type=' + type + '&Locationid=' + Locid + '&supid=' + supid + '&popurtypeid=' + typeid + '&From=' + from + '&To=' + to + '&subconid=' + subconid + '')
  }
  update(data: any) {
    console.log(data, 'data');
    return this.http.post('http://192.168.203.100:4000/POClose/Update', data)
  }
}
