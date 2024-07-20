import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {
  constructor(private http: HttpClient) { }
  Capex(Empid:any){
    return this.http.get('http://103.21.76.94:6055/Request/Capexvisibile?Empid='+Empid)
  }
  Department(Empid:any){
    return this.http.get('http://103.21.76.94:6055/Request/Department?Empid='+Empid)
  }
  Company(){
    return this.http.get("http://103.21.76.94:6055/Request/company")
  }
  CompName(CompanyId:any){
    return this.http.get('http://103.21.76.94:6055/Request/companyname?CompanyId='+CompanyId)
  }
  CapexNo(LocationId:any){
    return this.http.get('http://103.21.76.94:6055/Request/CapexNo?LocationId='+LocationId)
  }
  CapexValidationDept(empid:any){
    return this.http.get('http://103.21.76.94:6055/Request/CapexDepartment?empid='+empid)
  }
  Stockreno(mid: Number, trandate: any, locid: any) {
    return this.http.get('http://103.21.76.94:6055/Request/StockReqNo?mid=' + mid + '&trandate=' + trandate + '&locid=' + locid)
  }
  StockReNoValidation(StockReqNo:any){
    return this.http.get('http://103.21.76.94:6055/Request/StockReqNochck?StockReqNo='+StockReqNo)
  }
  Rawmaterial(locationid: any, Rawmatname: any) {
    return this.http.get('http://103.21.76.94:6055/Request/Get_RawMaterial?locationid=' + locationid +'&Rawmatname='+Rawmatname)

  }
  IndentDet(LocationId:any,SRDate:any,RawMatId:any,DeptId:any){
  return  this.http.get('http://103.21.76.94:6055/Request/StoreIndentDetl?LocationId='+LocationId+'&SRDate='+SRDate+'&RawMatId='+RawMatId+'&DeptId='+DeptId)
  }
  IntendPendingView(LocationId:any,RawMatID:any){
    return this.http.get('http://103.21.76.94:6055/Request/IndentPendingViewDet?LocationId='+LocationId+'&RawMatID='+RawMatID)
  }
  IssueLocId(empid:any){
    return this.http.get('http://103.21.76.94:6055/Request/IssueLocid?empid='+empid)
  }
  StockAvl(FrmModule:any,IndentType:any,Issuelocationwise:any,MaterialId:any,LoactionId:any,EmpId:any,Issuelocid:any){
    return this.http.get('http://103.21.76.94:6055/Request/StockCheck?FrmModule='+FrmModule+'&IndentType='+IndentType+'&Issuelocationwise='+Issuelocationwise+'&MaterialId='+MaterialId+'&LoactionId='+LoactionId+'&EmpId='+EmpId+'&Issuelocid='+Issuelocid)
  }
  StoreLoaction(LoactionId:any,Rawmatid:any){
    return this.http.get('http://103.21.76.94:6055/Request/StoreLoaction?LoactionId='+LoactionId+'&Rawmatid='+Rawmatid)
  }
  Uom(RawMatId:any){
    return this.http.get('http://103.21.76.94:6055/Request/ProductUom?RawMatId='+RawMatId)
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
  Save(PurchaseReqSave:any){
    return this.http.post('http://192.168.203.59.4000/Request/Post_PurchaseReq',PurchaseReqSave)
  }
}
