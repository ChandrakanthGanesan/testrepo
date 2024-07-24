import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SelflifeService {

  constructor(private http :HttpClient) { }
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
  GrnNo(LocationId:any): Observable<any>{
    return this.http.get('http://103.21.76.94:6055/Grn/SelfLife-GRNo?LocationId='+LocationId).pipe(
      catchError(this.handleError)
    );
  }
  Supplier(Grnno:any): Observable<any>{
    return this.http.get('http://103.21.76.94:6055/Grn/SelfLife-Supplier?Grnno='+Grnno)
  }
  Viewbtn(Grnno:any): Observable<any>{
    return this.http.get('http://103.21.76.94:6055/Grn/Selflife-ViewItemDetails?Grnno='+Grnno)
  }
  BatchQtyVaildation(GrnId:any): Observable<any>{
    return this.http.get('http://103.21.76.94:6055/Grn/Selflife-batchqty?GrnId='+GrnId)
  }
  Save(SelflifeUpdate:any): Observable<any>{
    return this.http.get('http://192.168.203.59:4000/Grn/Post_SleflifeHrd',SelflifeUpdate)
  }
}
