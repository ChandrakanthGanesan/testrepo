import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoretostoreService {

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
  Path1(LocationId: any) {
    return this.http.get("http://192.168.203.59:4000/Indent/Path1?LocationId=" + LocationId).pipe(
      catchError(this.handleError)
    );
  }
  Path2(Date: any) {
    return this.http.get("http://192.168.203.59:4000/Indent/Path2?Date=" + Date).pipe(
      catchError(this.handleError)
    );
  }
  Path3(Path: any) {
    return this.http.get("http://192.168.203.59:4000/Indent/Path3?Path=" + Path ).pipe(
      catchError(this.handleError)
    );
  }
  Warehouse(LocationId: any): Observable<any> {
    return this.http.get("http://192.168.203.59:4000/Indent/storetostore-Warehouse?LocationId=" + LocationId).pipe(
      catchError(this.handleError)
    );
  }
  Rawmaterial(Rawmatname: any) {
    return this.http.get('http://192.168.203.59:4000/Indent/storetostore_Material?Rawmatname=' + Rawmatname).pipe(
      catchError(this.handleError)
    );
  }
  Deptid(Empid: any) {
    return this.http.get('http://192.168.203.59:4000/Indent/dept?Empid=' + Empid).pipe(
      catchError(this.handleError)
    );
  }
  Stockchck(RawmatId: any, LocationId: any, FrmstoreId: any) {
    return this.http.get('http://192.168.203.59:4000/Indent/storetostore-Stockchck?RawmatId=' + RawmatId + '&LocationId=' + LocationId + '&FrmstoreId=' + FrmstoreId).pipe(
      catchError(this.handleError)
    );
  }
  ViewStock(LocationId: any, WarehouseId: any, RawmatId: any) {
    return this.http.get('http://192.168.203.59:4000/Indent/storetostore-View?LocationId=' + LocationId + '&WarehouseId=' + WarehouseId + '&RawmatId=' + RawmatId).pipe(
      catchError(this.handleError)
    );
  }
  save(StoreToStoreUpdate:any) {
    return this.http.post('http://192.168.203.59:4000/Indent/StoreToStoreUpdate',StoreToStoreUpdate).pipe(
      catchError(this.handleError)
    );
  }
}
