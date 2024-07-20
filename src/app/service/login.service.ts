import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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


  login(UserName: any, Password: any): Observable<any> {
    const apiUrl = ("http://192.168.203.59:4000/login/loginDetail/?usern=" + UserName + '&psw=' + Password);
    console.log(apiUrl);
    return this.http.get<any>(apiUrl);
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
    return this.http.get('http://103.21.76.94:6055/login/menurights')
  }
  Emailotp(fmail:any,tmail:any,shtml:any){
    return this.http.get('http://103.21.76.94:6055/login/sendmail?fmail='+fmail+'&tmail='+tmail+'&shtml='+shtml)
  }
  Mailuserlist(LocationId:any){
    return this.http.get('http://103.21.76.94:6055/login/mailuserlist?LocationId='+LocationId)
  }
  Loginattempt(Empid:any){
    return this.http.get('http://103.21.76.94:6055/login/LoginAttempt?Empid='+Empid)
  }
  OTPInsert(Empid:any,LocationId:any,Otp:any,FrmDate:any,TOdate:any,CreatedSystem:any,OtpValid:any){
    return this.http.get('http://103.21.76.94:6055/login/OtpInsert?Empid='+Empid+'&LocationId='+LocationId+'&Otp='+Otp+'&FrmDate='+FrmDate+'&TOdate='+TOdate+
    '&CreatedSystem='+CreatedSystem+'&OtpValid='+OtpValid)
  }
  Otpvaild(Empid:any,LocationId:any,Frmdate:any){
    return this.http.get('http://103.21.76.94:6055/login/OtpVaildation?Empid='+Empid+'&LocationId='+LocationId+'&Frmdate='+Frmdate)
  }
  OtpforgetUpdate(LocationId:any,Otp:any,Frmdate:any,Todate:any,CreatedSystem:any,OtpValidation:any,Empid:any){
    return this.http.get('http://103.21.76.94:6054/login/OtpforgetUpdate?LocationId='+LocationId+'&Otp='+Otp+'&Frmdate='+Frmdate+'&Todate='+Todate+'&CreatedSystem='+CreatedSystem+
     ' &OtpValidation='+OtpValidation+'&Empid='+ Empid)
  }
  UpdateOtpValidation(OtpVaildation:any,Empid:any,LocationId:any,Otp:any,EntryDate:any){
    return this.http.get('http://103.21.76.94:6055/login/OtpVaildationUpdate?OtpVaildation='+OtpVaildation+'&Empid='+Empid+'&LocationId='+LocationId+'&Otp='+Otp+'&EntryDate='+EntryDate )
  }
  InsertOtpDet(LoginUserName:any,UserId:any,Date_Time:any,Otp:any){
    return this.http.get('http://103.21.76.94:6055/login/InsertOtpDetalis?LoginUserName='+LoginUserName+'&UserId='+UserId+'&Date_Time='+Date_Time+'&Otp='+Otp)
  }
}
