import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageQtyAllocationService {

  constructor(private http: HttpClient) { }

  Items(){
    return this.http.get('http://192.168.203.59:4000/Grn/StorageQtyAlloc-Items');
  }
  View(LocationId:any,Rawmatid:any,Fromdate:any,Todate:any,Pending:any){
    return this.http.get('http://192.168.203.59:4000/Grn/ViewStockAlloc?LocationId='+LocationId+'&Rawmatid='+Rawmatid+'&Fromdate='+Fromdate+'&Todate='+Todate+"&Pending="+Pending)
  }
  Warehouse(LocationId:any){
    return this.http.get('http://192.168.203.59:4000/Grn/Stockalloc-Warehouse?LocationId='+LocationId)
  }
  Warhouse1(){
    return this.http.get('http://192.168.203.59:4000/Grn/Stockalloc-Warehouse1')
  }
  WarehouseName(LocationId:any){
    return this.http.get('http://192.168.203.59:4000/Grn/Stockalloc-WarehouseName?LocationId='+LocationId)
  }
  Save(UpdateStock:any){
    return this.http.post('http://192.168.203.59:4000/Grn/Post_Stockalloc-save',UpdateStock)
  }
}
