import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueRequestService {
  constructor(private http: HttpClient) { }

  StoreReqpath(LocationId: any, IssueIndentDate: any) {
    return this.http.get('http://103.21.76.94:6055/Request/IssueReqStoreReNoPath?LocationId=' + LocationId + '&IssueIndentDate=' + IssueIndentDate)
  }
  StockReqTrano(StoreReqPath: any) {
    return this.http.get('http://103.21.76.94:6055/Request/StoreReNo?StoreReqPath=' + StoreReqPath)
  }
  StockReNoVaildation(StoreReqno: any) {
    return this.http.get('http://103.21.76.94:6055/Request/StoreReqNoValidation?StoreReqno=' + StoreReqno)
  }
  CapexNo(LocationId:any){
    return this.http.get('http://103.21.76.94:6055/Request/CapexNo?LocationId='+LocationId)
  }
  Tollt(LoactionId: any, RawMatId: any) {
    return this.http.get('http://103.21.76.94:6055/Request/Tolltt?LoactionId=' + LoactionId + '&RawMatId=' + RawMatId)
  }
  Department(Empid: any) {
    return this.http.get('http://103.21.76.94:6055/Request/Department?Empid=' + Empid)
  }
  RawMat(Rawmatname: any) {
    return this.http.get('http://103.21.76.94:6055/Indent/storetostore_Material?Rawmatname=' + Rawmatname)
  }
  Uom(RawMatId: any) {
    return this.http.get('http://103.21.76.94:6055/Request/ProductUom?RawMatId=' + RawMatId)
  }
  IndentDet(LocationId: any, SRDate: any, RawMatId: any, DeptId: any) {
    return this.http.get('http://103.21.76.94:6055/Request/StoreIndentDetl?LocationId=' + LocationId + '&SRDate=' + SRDate + '&RawMatId=' + RawMatId + '&DeptId=' + DeptId)
  }
  IssueLocId(empid:any){
    return this.http.get('http://103.21.76.94:6055/Request/IssueLocid?empid='+empid)
  }
  StockAvl(FrmModule: any, IndentType: any, Issuelocationwise: any, MaterialId: any, LoactionId: any, EmpId: any, Issuelocid: any) {
    return this.http.get('http://103.21.76.94:6055/Request/StockCheck?FrmModule=' + FrmModule + '&IndentType=' + IndentType + '&Issuelocationwise=' + Issuelocationwise + '&MaterialId=' + MaterialId + '&LoactionId=' + LoactionId + '&EmpId=' + EmpId + '&Issuelocid=' + Issuelocid)
  }
  StoreLoaction(LoactionId:any,Rawmatid:any){
    return this.http.get('http://103.21.76.94:6055/Request/StoreLoaction?LoactionId='+LoactionId+'&Rawmatid='+Rawmatid)
  }
  Machine(LocationId:any){
    return this.http.get("http://103.21.76.94:6055/Request/Machinename?LocationId="+LocationId)
  }
  Warehouse(LocationId:any){
    return this.http.get("http://103.21.76.94:6055/Request/Warehouse?LocationId="+LocationId )
  }
   MatQtyPending(LocationId:any,Rawmatid:any){
    return this.http.get('http://103.21.76.94:6055/Request/MatQtypendingsts?LocationId='+LocationId+'&Rawmatid='+Rawmatid)
  }
  OldPOView(locid:any,Rawmatid:any){
    return this.http.get("http://103.21.76.94:6055/Request/OldPoView?locid="+locid+'&Rawmatid='+Rawmatid)
  }
  IntendPendingView(LocationId:any,RawMatID:any){
    return this.http.get('http://103.21.76.94:6055/Request/IndentPendingViewDet?LocationId='+LocationId+'&RawMatID='+RawMatID)
  }
  Grntype(RawMatId:any){
    return this.http.get('http://103.21.76.94:6055/Request/Grntypeid?RawMatId='+RawMatId)
  }
  save(IssueReqSave:any){
    return this.http.post('http://192.168.203.59.4000/Request/Post_IssueReq',IssueReqSave)
  }
}
