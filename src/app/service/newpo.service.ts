import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewpoService {
  private fileUrl = 'http://192.168.203.100:4000/newpo/get-file'

  constructor(private http: HttpClient) { }
  department(LocationID: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/department?LocationId=" + LocationID)
  }
  departmentId(deptname: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/departmentId?deptname=" + deptname)
  }
  supplierName() {
    return this.http.get("http://192.168.203.100:4000/newpo/SupplierName")
  }
  purchaseType() {
    return this.http.get("http://192.168.203.100:4000/newpo/purchaseType")
  }
  currencyType() {
    return this.http.get("http://192.168.203.100:4000/newpo/currencyType")
  }
  CurrtypeExchRate(CurrID: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/CurrtypeExchangert?CurrID=" + CurrID)
  }
  Location(LocationId: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/Location?LocationId=" + LocationId)
  }
  ponoformat(LocationId: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/ponoformat?LocationId=" + LocationId)
  }
  pono(pono: any, ponolike: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/pono?pono=" + pono + "&ponolike=" + ponolike)
  }
  CostCenter() {
    return this.http.get("http://192.168.203.100:4000/newpo/CostCenter")
  }
  CreditPerCurrrtype(supname: string) {
    return this.http.get("http://192.168.203.100:4000/newpo/CreditperCurrtype?supname=" + supname)
  }
  addidetailtable() {
    return this.http.get("http://192.168.203.100:4000/newpo/addiDetailTable")
  }
  maxpoID(LocationId: any, supplierId: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/maxpoid?LocationId=" + LocationId + "&supplierId=" + supplierId)
  }
  addValue(maxpoID: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/addDetailvalue?maxpoID=" + maxpoID)
  }
  paymentTerms() {
    return this.http.get("http://192.168.203.100:4000/newpo/paymentterms")
  }
  paymentDetails(termId: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/paytermsDetail?termId=" + termId)
  }
  termid(termid: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/termid?termid=" + termid)
  }
  mainTable(purchasetype: any, supplierID: any, LocationId: any, departmentId: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/poMainTable?purchasetype=" + purchasetype + "&supplierID=" + supplierID + "&LocationId=" + LocationId + "&departmentId=" + departmentId)
  }
  mainTable1(rawmatId: any, supplierID: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/poMainTable1?rawmatId=" + rawmatId + "&supplierId=" + supplierID)
  }
  mainTableTax(LocationId: any, rawMatId: any, supplierId: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/poMainTableTax?LocationId=" + LocationId + "&rawmatid=" + rawMatId + "&supplierId=" + supplierId)
  }
  mainTable2(supplierId: any, LocationId: any, rate: any, rawmatlid: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/pomaintable2?supplierId=" + supplierId + "&LocationId=" + LocationId + "&rate=" + rate + "&rawmatlid=" + rawmatlid)
  }
  maintable3(rawmatlid: any, rate: any, supplierId: any, LocationId: any, effsdate: any, effedate: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/pomaintable3?rawmatlid=" + rawmatlid + "&rate=" + rate + "&supplierId=" + supplierId + "&LocationId=" + LocationId + "&effsdate=" + effsdate + "&effedate=" + effedate)
  }
  maintablepoQty(matlid: any, LocationId: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/poMainTablepoQty?matlid=" + matlid + "&LocationId=" + LocationId)
  }
  GetSupplierId(supname: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/SupplierId?supname=" + supname)
  }
  taxper(taxgroupid: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/taxgrp?taxgroupid=" + taxgroupid)
  }
  taxtable(taxgroupid: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/taxtable?taxgroupid=" + taxgroupid)
  }
  release(data: any) {
    console.log(data, "api");  // Log the data object here to check what is being sent
    return this.http.post("http://192.168.203.100:4000/newpo/release", data);
  }
  save(data: any) {
    console.log(data, "api");
    return this.http.post("http://192.168.203.100:4000/newpo/save", data)
  }
  // attachment(){
  //   return this.http.get("http://192.168.203.100:400/newpo/api/drive/files")
  // }  
  oldpo1(rawmatid: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/oldpo1?rawmatid=" + rawmatid)
  }
  oldpo2(rawmatid: any) {
    return this.http.get("http://192.168.203.100:4000/newpo/oldpo2?rawmatid=" + rawmatid)
  }
  capex() {
    return this.http.get(this.fileUrl, { responseType: 'blob' });
  }
  // poschedulesave(data: any) {
  //   return this.http.post("http://192.168.203.100:4000/newpo/poschsave", data)
  // }
}
