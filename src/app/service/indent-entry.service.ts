import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndentEntryService {


  constructor(private http:HttpClient) { }
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

  Indentpath(LocationId:any){
      return this.http.get("http://192.168.203.59:3000/Indent/IndentEntryPath?LocationId="+LocationId).pipe(
        catchError(this.handleError)
      );
  }
  IndentTrano(IndentPath:any){
    return this.http.get("http://192.168.203.59:3000/Indent/IndentEntryTranno?IndentPath="+IndentPath).pipe(
      catchError(this.handleError)
    );
  }
  Dept(LoactionId:any){
    return this.http.get("http://192.168.203.59:3000/Indent/IndentEntryDept?LoactionId="+LoactionId).pipe(
      catchError(this.handleError)
    );
  }
  Category(EmpId:any,LoactionId:any){
    return this.http.get("http://192.168.203.59:3000/Indent/Category?EmpId="+EmpId+'&LoactionId='+LoactionId).pipe(
      catchError(this.handleError)
    );
  }
  Approvedby(LoactionId:any,Deptid:any){
    return this.http.get("http://192.168.203.59:3000/Indent/Approved?LoactionId="+LoactionId+'&Deptid='+Deptid).pipe(
      catchError(this.handleError)
    );
  }
  Employye(LoactionId:any,CatId:any,Deptid:any){
    return this.http.get("http://192.168.203.59:3000/Indent/emp?LoactionId="+LoactionId+'&CatId='+CatId+'&Deptid='+Deptid).pipe(
      catchError(this.handleError)
    );
  }
  Material(LocationId:any,DeptId:any){
    return this.http.get("http://192.168.203.59:3000/Indent/Mat?LocationId="+LocationId+'&DeptId='+DeptId)
  }
  ViewStoreRelease(LocationID:any,Srttype:any,Frmdate:any,Todate:any,Deptid:any,Empid:any,Rawmatid:any){
    return this.http.get("http://192.168.203.59:3000/Indent/ViewStoreRelease?LocationID="+LocationID+'&Srttype='+Srttype+'&Frmdate='+Frmdate+
      '&Todate='+Todate+'&Deptid='+Deptid+'&Empid='+Empid+'&Rawmatid='+Rawmatid)
  }
  IndentDet(LocationId:any,SRDate:any,RawMatId:any,DeptId:any){
    return  this.http.get('http://192.168.203.59:3000/Request/StoreIndentDetl?LocationId='+LocationId+'&SRDate='+SRDate+'&RawMatId='+RawMatId+'&DeptId='+DeptId)
    }
  PoPendingQty(LoactionId:any,RawmatId:any){
    return this.http.get("http://192.168.203.59:3000/Indent/PendingPoQty?LoactionId="+LoactionId+'&RawmatId='+RawmatId)
  }
}
