import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreIssueService {

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
  Issuenopath(LocationId:any){
    return this.http.get("http://103.21.76.94:6055/Indent/IndentNopath?LocationId="+LocationId).pipe(
      catchError(this.handleError)
    );
  }
  StoteissueNo(Indentnnoapath:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-IndentNo?Indentnnoapath="+Indentnnoapath).pipe(
      catchError(this.handleError)
    );
  }
  Department(LocationId:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-Department?LocationId="+LocationId).pipe(
      catchError(this.handleError)
    );
  }
  Warehouse(LocationId:any){
    return this.http.get('http://103.21.76.94:6055/Indent/StoreIssue-Warehouse?LocationId='+LocationId).pipe(
      catchError(this.handleError)
    );
  }
  Rawmaterial(Locationid:any,Deptid:any,Fromdate:any,Todate:any,SrRefNo:any){
    return this.http.get('http://103.21.76.94:6055/Indent/StoreIssue-Material?Locationid='+Locationid+'&Deptid='+Deptid+'&Fromdate='+Fromdate+
    '&Todate='+Todate+'&SrRefNo='+SrRefNo).pipe(
      catchError(this.handleError)
    );
  }
  Refno(Locationid:any,Issuedate:any,Frmdate:any,Todate:any,Deptid:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssueRefno?Locationid="+Locationid+'&Issuedate='+Issuedate+
      '&Frmdate='+Frmdate+'&Todate='+Todate+'&Deptid='+Deptid).pipe(
        catchError(this.handleError)
      );
  }
  IssueMaterialViewbtn(Locationid:any,Issuedate:any,WarehouseId:any,Deptid:any,Srno:any,Rawmatid:any,Frmdate:any,Todate:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-ViewMaterial?Locationid="+Locationid+'&Issuedate='+Issuedate+'&WarehouseId='+WarehouseId+
    '&Deptid='+Deptid+'&Srno='+Srno+'&Rawmatid='+Rawmatid+'&Frmdate='+Frmdate+'&Todate='+Todate ).pipe(
      catchError(this.handleError)
    );
  }
  StockDepands(CompanyName:any,Rawmatid:any,Locationid:any,Warehouseid:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-StockDepandsCompany?CompanyName="+CompanyName+'&Rawmatid='+Rawmatid+'&Locationid='+Locationid+'&Warehouseid='+Warehouseid).pipe(
      catchError(this.handleError)
    );
  }
  IndentDet(LocationId:any,SRDate:any,RawMatId:any,DeptId:any){
    return  this.http.get('http://103.21.76.94:6055/Request/StoreIndentDetl?LocationId='+LocationId+'&SRDate='+SRDate+'&RawMatId='+RawMatId+'&DeptId='+DeptId).pipe(
      catchError(this.handleError)
    );
    }
  GmRefNo(Warehouseno:any,Rawmatid:any,Locationid:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-GmRefNo?Warehouseno="+Warehouseno+'&Rawmatid='+Rawmatid+'&Locationid='+Locationid).pipe(
      catchError(this.handleError)
    );
  }
  StockCheck(IssueQty:any,Rawmatid:any,Warehousevalue:any,GrnId:any,Locationid:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-StockCheck?IssueQty="+IssueQty+'&Rawmatid='+Rawmatid+'&Warehousevalue='+Warehousevalue+'&GrnId='+GrnId+'&Locationid='+Locationid).pipe(
      catchError(this.handleError)
    );
  }
  Batch(Grnid:any){
    return this.http.get("http://103.21.76.94:6055/Indent/Storeissue-Batchwise?Grnid="+Grnid).pipe(
      catchError(this.handleError)
    );
  }
  Save(UpdateStoreIssue:any){
    return this.http.post('http://192.168.203.59:3000/Indent/Post_StoreIssue',UpdateStoreIssue).pipe(
      catchError(this.handleError)
    );
  }
}
