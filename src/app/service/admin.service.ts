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
    return this.http.get('http://192.168.203.59:4000/login/Location')
  }

  dept(){
    return this.http.get('http://192.168.203.59:4000/login/Department')
  }
  Emp(Deptid:any){
    return this.http.get('http://192.168.203.59:4000/login/Empolyee?Deptid='+Deptid)
  }
  menuname(){
    return this.http.get('http://192.168.203.59:4000/login/menuname')
  }
  View(Empid:any,DeptId:any,LocationId:any){
    return this.http.get('http://192.168.203.59:4000/login/Viewrights?Empid='+Empid+'&DeptId='+DeptId+'&LocationId='+LocationId)
  }
  poweruser(Empid:any){
    return this.http.get('http://192.168.203.59:4000/login/Poweruser?Empid='+Empid)
  }
  Approved(){
    return this.http.get('http://192.168.203.59:4000/login/Approved')
  }
  RighitsCheck(Empid: any, Locationid: any,ModuleId:any) {
    return this.http.get('http://192.168.203.59:4000/login/Samelocationrightscheck?Empid=' + Empid + '&Locationid=' + Locationid+'&ModuleId='+ModuleId)
  }
  Save(RightsUpdate:any){
    return this.http.post('http://192.168.203.59:4000/login/MenuRighitsDet',RightsUpdate)
  }
  Unapprove(ModuleId:any,Empid:any,DeptId:any,LocationId:any){
    return this.http.get('http://192.168.203.59:4000/login/Unapprove?ModuleId='+ModuleId+'&Empid='+Empid+'&DeptId='+DeptId+'&LocationId='+LocationId)
  }

  View1(): Observable<any>{
    return this.http.get('http://192.168.203.59:4000/login/menuname').pipe(
      catchError(this.handleError)
    );
  }

}