import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestService {
  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server Return Error : ${error.status} => ${error.message}`;
    }
    return throwError(errorMessage);
  }
  Capex(Empid:any){
    return this.http.get('http://192.168.203.59:3000/Request/Capexvisibile?Empid='+Empid).pipe(
      catchError(this.handleError))

  }
  Department(Empid:any){
    return this.http.get('http://192.168.203.59:3000/Request/Department?Empid='+Empid)
  }
  Company(){
    return this.http.get("http://192.168.203.59:3000/Request/company")
  }
  CompName(CompanyId:any){
    return this.http.get('http://192.168.203.59:3000/Request/companyname?CompanyId='+CompanyId)
  }
  CapexNo(LocationId:any){
    return this.http.get('http://192.168.203.59:3000/Request/CapexNo?LocationId='+LocationId)
  }
  CapexValidationDept(empid:any){
    return this.http.get('http://192.168.203.59:3000/Request/CapexDepartment?empid='+empid).pipe(
      catchError(this.handleError))
  }
  Stockreno(mid: Number, trandate: any, locid: any) {
    return this.http.get('http://192.168.203.59:3000/Request/StockReqNo?mid=' + mid + '&trandate=' + trandate + '&locid=' + locid)
  }
  StockReNoValidation(StockReqNo:any){
    return this.http.get('http://192.168.203.59:3000/Request/StockReqNochck?StockReqNo='+StockReqNo)
  }
  Rawmaterial(locationid: any, Rawmatname: any) {
    return this.http.get('http://192.168.203.59:3000/Request/Get_RawMaterial?locationid=' + locationid +'&Rawmatname='+Rawmatname)

  }
  IndentDet(LocationId:any,SRDate:any,RawMatId:any,DeptId:any){
  return  this.http.get('http://192.168.203.59:3000/Request/StoreIndentDetl?LocationId='+LocationId+'&SRDate='+SRDate+'&RawMatId='+RawMatId+'&DeptId='+DeptId)
  }
  IntendPendingView(LocationId:any,RawMatID:any){
    return this.http.get('http://192.168.203.59:3000/Request/IndentPendingViewDet?LocationId='+LocationId+'&RawMatID='+RawMatID)
  }
  IssueLocId(empid:any){
    return this.http.get('http://192.168.203.59:3000/Request/IssueLocid?empid='+empid)
  }
  StockAvl(FrmModule:any,IndentType:any,Issuelocationwise:any,MaterialId:any,LoactionId:any,EmpId:any,Issuelocid:any){
    return this.http.get('http://192.168.203.59:3000/Request/StockCheck?FrmModule='+FrmModule+'&IndentType='+IndentType+'&Issuelocationwise='+Issuelocationwise+'&MaterialId='+MaterialId+'&LoactionId='+LoactionId+'&EmpId='+EmpId+'&Issuelocid='+Issuelocid)
  }
  StoreLoaction(LoactionId:any,Rawmatid:any){
    return this.http.get('http://192.168.203.59:3000/Request/StoreLoaction?LoactionId='+LoactionId+'&Rawmatid='+Rawmatid)
  }
  Uom(RawMatId:any){
    return this.http.get('http://192.168.203.59:3000/Request/ProductUom?RawMatId='+RawMatId)
  }
  Machine(LocationId:any){
    return this.http.get("http://192.168.203.59:3000/Request/Machinename?LocationId="+LocationId)
  }
  Warehouse(LocationId:any){
    return this.http.get("http://192.168.203.59:3000/Request/Warehouse?LocationId="+LocationId )
  }
  MatQtyPending(LocationId:any,Rawmatid:any){
    return this.http.get('http://192.168.203.59:3000/Request/MatQtypendingsts?LocationId='+LocationId+'&Rawmatid='+Rawmatid)
  }
  OldPOView(locid:any,Rawmatid:any){
    return this.http.get("http://192.168.203.59:3000/Request/OldPoView?locid="+locid+'&Rawmatid='+Rawmatid)
  }
  Save(PurchaseReqSave:any){
    return this.http.post('http://192.168.203.59.3000/Request/Post_PurchaseReq',PurchaseReqSave)
  }
}
