import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DirectIndentService {
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred:  ${error.error.message}`
    } else {
      // Backend error
      errorMessage = `Server Returned: "  ${error.status}", Error : ${error.message}`;
    }
    return throwError(errorMessage);
  }
  PoPath(LoactionId: any, indentdate: any) {
    return this.http.get("http://192.168.203.59:4000/Indent/IndentNo?LoactionId=" + LoactionId + '&indentdate=' + indentdate).pipe(
      catchError(this.handleError)
    );
  }
  IndentPONo(IndentNo: any) {
    return this.http.get("http://192.168.203.59:4000/Indent/IndentPONo?IndentNo=" + IndentNo).pipe(
      catchError(this.handleError)
    );
  }
  Department(LoctionId: any, EmpId: any) {
    return this.http.get("http://192.168.203.59:4000/Indent/Department?LoctionId=" + LoctionId + '&EmpId=' + EmpId).pipe(
      catchError(this.handleError)
    );
  }
  CostCenter() {
    return this.http.get("http://192.168.203.59:4000/Indent/CostCenter").pipe(
      catchError(this.handleError)
    );
  }
  CapexNo(LoctionId: any) {
    return this.http.get("http://192.168.203.59:4000/Indent/CapexNo?LoctionId=" + LoctionId)
  }
  EmpApr(LocationId: any, DeptId: any, com_selename: any) {
    return this.http.get("http://192.168.203.59:4000/Indent/ApprovalEmployees?LocationId=" + LocationId + '&DeptId=' + DeptId + '&com_selename=' + com_selename)
  }
  EmpCat(Empid: any, LoctionId: any) {
    return this.http.get("http://192.168.203.59:4000/Indent/EmployeeCategory?Empid=" + Empid + '&LoctionId=' + LoctionId)
  }
  EmpDet(LoctionId: any, EmpId: any, CategoryId: any) {
    return this.http.get("http://192.168.203.59:4000/Indent/EmpDetalis?LoctionId=" + LoctionId + '&EmpId=' + EmpId + '&CategoryId=' + CategoryId)
  }
    RawMat(Rawmatname: any, Rawmatid: any) {
      return this.http.get("http://192.168.203.59:4000/Indent/RawMaterial?Rawmatname=" + Rawmatname + '&Rawmatid=' + Rawmatid)
    }
  IndentDet(LocationId: any, SRDate: any, RawMatId: any, DeptId: any) {
    return this.http.get('http://192.168.203.59:4000/Request/StoreIndentDetl?LocationId=' + LocationId + '&SRDate=' + SRDate + '&RawMatId=' + RawMatId + '&DeptId=' + DeptId)
  }
  Uom(RawMatId: any) {
    return this.http.get('http://192.168.203.59:4000/Request/ProductUom?RawMatId=' + RawMatId)
  }
  StockAvl(FrmModule:any,IndentType:any,Issuelocationwise:any,MaterialId:any,LoactionId:any,EmpId:any,Issuelocid:any){
    return this.http.get('http://192.168.203.59:4000/Request/StockCheck?FrmModule='+FrmModule+'&IndentType='+IndentType+'&Issuelocationwise='+Issuelocationwise+'&MaterialId='+MaterialId+'&LoactionId='+LoactionId+'&EmpId='+EmpId+'&Issuelocid='+Issuelocid)
  }
  IssueLocId(empid:any){
    return this.http.get('http://192.168.203.59:4000/Request/IssueLocid?empid='+empid)
  }
  StoreLoaction(LoactionId: any, Rawmatid: any) {
    return this.http.get('http://192.168.203.59:4000/Request/StoreLoaction?LoactionId=' + LoactionId + '&Rawmatid=' + Rawmatid)
  }
  Machine(LocationId:any){
    return this.http.get("http://192.168.203.59:4000/Request/Machinename?LocationId="+LocationId)
  }
  Warehouse(LocationId:any){
    return this.http.get("http://192.168.203.59:4000/Request/Warehouse?LocationId="+LocationId )
  }
  OldPOView(locid:any,Rawmatid:any){
    return this.http.get("http://192.168.203.59:4000/Request/OldPoView?locid="+locid+'&Rawmatid='+Rawmatid)
  }
  IntendPendingView(LocationId:any,RawMatID:any){
    return this.http.get('http://192.168.203.59:4000/Request/IndentPendingViewDet?LocationId='+LocationId+'&RawMatID='+RawMatID)
  }
  MatQtyPending(LocationId:any,Rawmatid:any){
    return this.http.get('http://192.168.203.59:4000/Request/MatQtypendingsts?LocationId='+LocationId+'&Rawmatid='+Rawmatid)
  }
  Save(DirectIndentSave:any){
    return this.http.post('http://192.168.203.59:4000/Indent/Post_DirectIndent',DirectIndentSave)
  }
}

