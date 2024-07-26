import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, pipe, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  l: any = 0;
  Ch: any = "";
  Chstr: any = "";
  CrStr: any = "";
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

  login(UserName: any, Password: any): Observable<any> {

    return this.http.get("http://192.168.203.59:4000/login/loginDetail/?usern=" + UserName + '&psw=' + Password).pipe(
      catchError(this.handleError))
  }
    companyDetail() {
    return this.http.get("http://192.168.203.59:4000/login/Location")
  }
  CryptString(Strvar: any) {
    this.Chstr = "";
    this.CrStr = "";
    this.l = Strvar.length;
    for (let i = 1; i <= this.l; i++) {
      this.Ch = Strvar.substr(i - 1, 1);
      this.CrStr = this.Ch.charCodeAt(0) + (5);
      if (i < 3) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(255)
        console.log(this.Chstr , String.fromCharCode(this.CrStr) + String.fromCharCode(255));

      }

      else if (i >= 3 && i < 6) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(254)
      }

      else if (i >= 6 && i < 9) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(253)
      }
      else if (i >= 9 && i < 12) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(250)
      }
      else if (i >= 12 && i < 15) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(251)
      }
      else if (i >= 15 && i < 18) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(255)
      }
      else if (i >= 18 && i < 21) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(254)
      }
      else if (i >= 21 && i < 24) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(253)
      }
      else if (i >= 24 && i < 27) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(250)
      }
      else if (i >= 27 && i <= 30) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(251)
      }
      else if (i > 30) {
        this.Chstr = this.Chstr + String.fromCharCode(this.CrStr) + String.fromCharCode(250)
      }
      //  console.log(Chstr);
    };
    // CryptString = Chstr
    // console.log(this.Chstr);
    return this.Chstr
  };

  RighitsCheck(Empid: any, Locationid: any) {
    return this.http.get('http://192.168.203.59:4000/login/rightscheck?Empid=' + Empid + '&Locationid=' + Locationid)
  }
  menuname() {
    return this.http.get('http://192.168.203.59:4000/login/menurights')
  }
  Emailotp(fmail:any,tmail:any,shtml:any){
    return this.http.get('http://192.168.203.59:4000/login/sendmail?fmail='+fmail+'&tmail='+tmail+'&shtml='+shtml)
  }
  Mailuserlist(LocationId:any){
    return this.http.get('http://192.168.203.59:4000/login/mailuserlist?LocationId='+LocationId)
  }
  Loginattempt(Empid:any){
    return this.http.get('http://192.168.203.59:4000/login/LoginAttempt?Empid='+Empid)
  }
  OTPInsert(Empid:any,LocationId:any,Otp:any,FrmDate:any,TOdate:any,CreatedSystem:any,OtpValid:any){
    return this.http.get('http://192.168.203.59:4000/login/OtpInsert?Empid='+Empid+'&LocationId='+LocationId+'&Otp='+Otp+'&FrmDate='+FrmDate+'&TOdate='+TOdate+
    '&CreatedSystem='+CreatedSystem+'&OtpValid='+OtpValid)
    }
  Otpvaild(Empid:any,LocationId:any,Frmdate:any){
    return this.http.get('http://192.168.203.59:4000/login/OtpVaildation?Empid='+Empid+'&LocationId='+LocationId+'&Frmdate='+Frmdate)
  }
  OtpforgetUpdate(LocationId:any,Otp:any,Frmdate:any,Todate:any,CreatedSystem:any,OtpValidation:any,Empid:any){
    return this.http.get('http://103.21.76.94:6054/login/OtpforgetUpdate?LocationId='+LocationId+'&Otp='+Otp+'&Frmdate='+Frmdate+'&Todate='+Todate+'&CreatedSystem='+CreatedSystem+
     ' &OtpValidation='+OtpValidation+'&Empid='+ Empid)
  }
  UpdateOtpValidation(OtpVaildation:any,Empid:any,LocationId:any,Otp:any,EntryDate:any){
    return this.http.get('http://192.168.203.59:4000/login/OtpVaildationUpdate?OtpVaildation='+OtpVaildation+'&Empid='+Empid+'&LocationId='+LocationId+'&Otp='+Otp+'&EntryDate='+EntryDate )
  }
  InsertOtpDet(LoginUserName:any,UserId:any,Date_Time:any,Otp:any){
    return this.http.get('http://192.168.203.59:4000/login/InsertOtpDetalis?LoginUserName='+LoginUserName+'&UserId='+UserId+'&Date_Time='+Date_Time+'&Otp='+Otp)
  }
}
