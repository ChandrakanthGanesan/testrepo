import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

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
  Location(){
    return this.http.get('http://103.21.76.94:6055/login/Location').pipe(
      catchError(this.handleError))
  }

  dept(){
    return this.http.get('http://103.21.76.94:6055/login/Department').pipe(
      catchError(this.handleError))
  }
  Emp(Deptid:any){
    return this.http.get('http://103.21.76.94:6055/login/Empolyee?Deptid='+Deptid).pipe(
      catchError(this.handleError))
  }
  menuname(){
    return this.http.get('http://103.21.76.94:6055/login/menuname').pipe(
      catchError(this.handleError))
  }
  View(Empid:any,DeptId:any,LocationId:any){
    return this.http.get('http://103.21.76.94:6055/login/Viewrights?Empid='+Empid+'&DeptId='+DeptId+'&LocationId='+LocationId).pipe(
      catchError(this.handleError))
  }
  poweruser(Empid:any){
    return this.http.get('http://103.21.76.94:6055/login/Poweruser?Empid='+Empid).pipe(
      catchError(this.handleError))
  }
  Approved(){
    return this.http.get('http://103.21.76.94:6055/login/Approved').pipe(
      catchError(this.handleError))
  }
  RighitsCheck(Empid: any, Locationid: any,ModuleId:any) {
    return this.http.get('http://103.21.76.94:6055/login/Samelocationrightscheck?Empid=' + Empid + '&Locationid=' + Locationid+'&ModuleId='+ModuleId)
  }
  Save(RightsUpdate:any){
    return this.http.post('http://103.21.76.94:6055/login/MenuRighitsDet',RightsUpdate).pipe(
      catchError(this.handleError))
  }
  Unapprove(ModuleId:any,Empid:any,DeptId:any,LocationId:any){
    return this.http.get('http://103.21.76.94:6055/login/Unapprove?ModuleId='+ModuleId+'&Empid='+Empid+'&DeptId='+DeptId+'&LocationId='+LocationId).pipe(
      catchError(this.handleError))
  }

  View1(): Observable<any>{
    return this.http.get('http://103.21.76.94:6055/login/menuname').pipe(
      catchError(this.handleError)
    );
  }

}
