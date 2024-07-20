import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform!: FormGroup;
  Mpinform!: FormGroup;
  password: string = ''
  Frm_emailId: any
  Frmdate: any
  currentDate = new Date()
  Todate: any
  Frmdate1: any
  constructor(private router: Router, private date: DatePipe,private spinnerService: NgxSpinnerService, private fb: FormBuilder, private toastr: ToastrService, private zone: NgZone, private service: LoginService) { }
  ngOnInit(): void {
    this.password = 'password';
    this.Frmdate = this.date.transform(this.currentDate, 'yyyy/MM/dd hh:MM:ss');
    this.Frmdate1 = this.date.transform(this.currentDate, 'yyyy/MM/dd ');
    this.Todate = this.date.transform(this.currentDate, 'yyyy/MM/dd hh:MM:ss');
    // console.log(this.Frmdate, this.Todate);
    this.loginform = this.fb.group({
      UserName: new FormControl('', Validators.required),
      Pwd: new FormControl('', Validators.required),
      Loaction: new FormControl('', Validators.required)
    });
    this.Mpinform = this.fb.group({
      Loaction: new FormControl('', Validators.required),
    });
    this.Company()
  }
  Login: boolean = false;
  Mpin: boolean = true;
  entry: string = 'Pin';
  mobileNo: any = '';

  myModal: any;
  action(e: any) {
    this.entry = e.target.value
    if (this.entry == 'Name') {
      this.Login = true
      this.Mpin = false;
    }
    else if (this.entry == 'Pin') {
      this.Login = false
      this.Mpin = true;
      this.mobileNo = ''
      // this.setValue()
    }
  }
  backspace: any
  back() {
    this.backspace = document.querySelector(".pin-code")
    this.backspace.addEventListener('keyup', (Event: any) => {
      var target = Event.srcElement;
      const myLength = target.value.length;
      if (myLength === 0) {
        var next = target;
        while (next = next.previousElementSibling) {
          // console.log(next.previousElementSibling 'vccddd');
          if (next == null) break;
          if (next.tagName.toLowerCase() == "input") {
            next.focus();
            break;
          }
        }
      }
    })
  }

  show = false;
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  Loaction: any[] = new Array()
  Company() {
    this.service.companyDetail().subscribe((res: any) => {
      this.Loaction = res
      // console.log(this.Loaction);

    })
  }
  LoactionId: any[] = new Array()
  LoactionEvent(event: any) {
    const LoactionId = parseInt(event.target.value)
    // console.log(LoactionId, 'LoactionId');
    this.LoactionId.push(LoactionId)
    sessionStorage.setItem('location', JSON.stringify(this.LoactionId));

  }
  get go(): { [key: string]: AbstractControl } {
    return this.loginform.controls;
  }
  gobtn: any
  logindata: any[] = new Array()
  Strvar: any = ''
  UserEmpid: number = 0
  userloc: number = 0
  login() {
    this.gobtn = true
    if (this.loginform.invalid) {
      return
    } else {
      this.service.login(this.loginform.controls['UserName'].value, this.loginform.controls['Pwd'].value).subscribe((res: any) => {
        this.logindata = res
        // console.log(this.logindata, 'login');
        if (this.logindata[0].password === this.service.CryptString(this.loginform.controls['Pwd'].value)) {
          this.toastr.success('Login Successfully', 'Success');
          this.zone.run(() => {
            sessionStorage.setItem('session', JSON.stringify(this.logindata));


            const user = JSON.parse(sessionStorage.getItem('session') || '{}');
            this.Frm_emailId = user[0].email
            this.Empname = user[0].cusername
            this.Poweruser = user[0].poweruser
            this.UserEmpid = user[0].empid
            const data = JSON.parse(sessionStorage.getItem('location') || '{}');
            this.userloc = data[data.length - 1]
            this.router.navigate(['/Dashboard'], {});
            // if (this.Poweruser === 'Y') {
            //   this.router.navigate(['/Dashboard'], {});
            // } else {
            //   this.getMailuserlist()
            //   this.showDialog()
            // }
          })
        } else {
          this.toastr.error('Please Check Username and Password', 'Error')
        }
      })

    }
  }
  Empname: string = ''
  Poweruser: string = ''
  Mpinlogin() {
    this.router.navigate(['/Dashboard'], {});
  }
  Mailuserlist: any[] = new Array()
  getMailuserlist() {
    this.spinnerService.show()
    this.service.Mailuserlist(this.LoactionId).subscribe((data: any) => {
      this.spinnerService.hide()
      this.Mailuserlist = data
      console.log(this.Mailuserlist);
      this.Mailuserlist[0].EmpId
    })
  }
  Otpsenderempid: number = 0
  LoginUserEvent(event: any) {
    this.Otpsenderempid = parseInt(event.target.value)
    console.log(this.Otpsenderempid);

    const mail = this.Mailuserlist.forEach((data: any) => {
      if (data.EmpId === this.Otpsenderempid) {
        this.ToMailid = data.email

      }
      console.log(this.ToMailid);
    })
  }
  getLoginAttempt() {
    this.service.Loginattempt(this.UserEmpid).subscribe((data: any) => {
      const userdetalis = data
      this.Otpvaild = userdetalis[0].login_attemp
      // console.log(this.Otpvaild, 'this.Otpvaild');

    })
  }
  CreatedSys: string = 'TabEntry'
  Otpvaild: number = 0
  InsertOtp: any = new Array()
  vaildotp: any = new Array()
  ToMailid: any = ''
  MailContentOtp: any = ''
  Otp: any[] = new Array()
  Otprandom: any
  send() {
    this.getLoginAttempt()
    this.Otprandom = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
    console.log(this.Otprandom, 'pin');
    this.MailContentOtp = 'Dear' + " " + this.Empname + " " + 'Required OTP Is' + " " + this.Otprandom + " " + '. Your OTP for SFPL User Emergency Login Purpose. ISD Team, SANDFITS'
    this.ToMailid = 'trickyman001@gmail.com'
    this.toastr.success("Mail Sent Succesfully")
    this.service.Otpvaild(this.UserEmpid, this.userloc, this.Frmdate1).subscribe((data: any) => {
      this.vaildotp = data
      // console.log(this.vaildotp);
      if (this.vaildotp.length !== 0 && (parseInt(this.vaildotp[0].OtpValidation) === 1 || parseInt(this.vaildotp[0].OtpValidation) === 2 || parseInt(this.vaildotp[0].OtpValidation) === 3)) {
        this.visible = false;
        const otprequest = document.getElementById('OtpReq') as HTMLButtonElement
        otprequest.click()
      }
      if (this.vaildotp.length === 0) {
        this.service.Emailotp(this.Frm_emailId, this.ToMailid, this.MailContentOtp).subscribe((data: any) => {
          this.Otpsucess = true
          this.Otp = data
          this.Otpsucess = false
        })
      }
    })
    const a = document.getElementById("clk") as HTMLButtonElement
    a.disabled = true;
  }

  Otpsucess: boolean = false
  otpExpiryKey: any
  storedOTP: any
  OtpManual: any
  otpvaildation: number = 0
  updateotpVaild: any[] = new Array()
  status: string = 'L'
  FinalLogin() {
    if (this.status === 'L') {
      this.service.Otpvaild(this.UserEmpid, this.userloc, this.Frmdate1).subscribe((data: any) => {
        this.vaildotp = data
        if (this.vaildotp.length !== 0) {
          if (parseInt(this.vaildotp[0].OtpValidation) !== 0) {
            if (parseInt(this.OtpManual) === parseInt(this.vaildotp[0].otp)) {
              // this.otpvaildation = 8
              this.service.UpdateOtpValidation(this.otpvaildation, this.UserEmpid, this.userloc, this.OtpManual, this.Frmdate1).subscribe((data: any) => {
                this.updateotpVaild = data
                if (this.updateotpVaild[0].status === 'Y') {
                  // this.router.navigate(['/Dashboard'], {});
                  this.service.InsertOtpDet(this.Empname, this.UserEmpid, this.Frmdate, this.OtpManual).subscribe((data: any) => {
                    const InsertOtpDetalis = data
                    if (InsertOtpDetalis[0].status === 'Y') {
                      this.router.navigate(['/Dashboard'], {});
                    }else{
                      this.otpvaildation=  this.otpvaildation +1
                      this.service.UpdateOtpValidation(this.otpvaildation, this.UserEmpid, this.userloc, this.OtpManual, this.Frmdate1).subscribe((data: any) => {
                        this.updateotpVaild = data
                      })
                    }
                  })
                } else {
                  this.toastr.error(this.updateotpVaild[0].Msg)
                }
              })
            } else {
              this.toastr.error("Invalid OTP..Please Check...");
              return
            }
          } else {
            if(parseInt(this.vaildotp[0].OtpValidation)===0){
              const newotp=document.getElementById('newotp')as HTMLInputElement
              newotp.click()
            }
            this.Otpvaild = this.Otpvaild - 1
            this.service.OTPInsert(this.UserEmpid, this.userloc, this.Otprandom, this.Frmdate1, this.Todate, this.CreatedSys, this.Otpvaild).subscribe((data: any) => {
              this.InsertOtp = data
              if (this.InsertOtp[0].status === 'Y') {
                this.service.InsertOtpDet(this.Empname, this.UserEmpid, this.Frmdate, this.Otprandom).subscribe((data: any) => {
                  const InsertOtpDetalis = data
                  if (InsertOtpDetalis[0].status === 'Y') {
                    this.router.navigate(['/Dashboard'], {});
                  } else {
                    this.toastr.error(InsertOtpDetalis[0].Msg)
                    return
                  }
                })
              } else {
                this.toastr.error(this.InsertOtp[0].Msg)
                return
              }
            })
          }
        } else {
          this.Otpvaild = this.Otpvaild - 1
          this.service.OTPInsert(this.UserEmpid, this.userloc, this.Otprandom, this.Frmdate1, this.Todate, this.CreatedSys, this.Otpvaild).subscribe((data: any) => {
            this.InsertOtp = data
            // console.log(this.InsertOtp);
            if (this.InsertOtp[0].status === 'Y') {
              this.service.InsertOtpDet(this.Empname, this.UserEmpid, this.Frmdate, this.Otprandom).subscribe((data: any) => {
                const InsertOtpDetalis = data
                // console.log(InsertOtpDetalis, 'InsertOtpDetalis');
                if (InsertOtpDetalis[0].status === 'Y') {
                  this.router.navigate(['/Dashboard'], {});
                } else {
                  this.toastr.error(InsertOtpDetalis[0].Msg)
                  return
                }
              })
            } else {
              this.toastr.error(this.InsertOtp[0].Msg)
              return
            }
          })
        }
      })
    }
    if (this.status === 'Y') {
      this.visible = true;
      this.otpvaildation = this.vaildotp[0].OtpValidation - 1
      // console.log(this.otpvaildation);
      if (this.vaildotp.length !== 0 && (parseInt(this.vaildotp[0].OtpValidation) === 1 || parseInt(this.vaildotp[0].OtpValidation) === 2 || parseInt(this.vaildotp[0].OtpValidation) === 3)) {
        this.service.OtpforgetUpdate(this.userloc, this.Otprandom, this.Frmdate1, this.Todate, this.CreatedSys, this.otpvaildation, this.UserEmpid).subscribe((data: any) => {
          this.ExisitingOtpUpdateData = data
          if (this.ExisitingOtpUpdateData[0].status === 'Y') {
            this.service.InsertOtpDet(this.Empname, this.UserEmpid, this.Frmdate, this.Otprandom).subscribe((data: any) => {
              const InsertOtpDetalis = data
              // console.log(InsertOtpDetalis, 'InsertOtpDetalis');
              if (InsertOtpDetalis[0].status === 'Y') {
                this.router.navigate(['/Dashboard'], {});
              } else {
                this.toastr.error(InsertOtpDetalis[0].Msg)
                return
              }
            })
          } else {
            this.toastr.error(this.InsertOtp[0].Msg)
            return
          }
        })
      } else {
        this.toastr.error('Entered Otp is Wrong..Please Check...')
        return
      }
    }
    if (this.status === 'N') {
      this.otpvaildation = this.vaildotp[0].OtpValidation - 1
      // console.log(this.otpvaildation);
      this.service.Otpvaild(this.UserEmpid, this.userloc, this.Frmdate1).subscribe((data: any) => {
        this.vaildotp = data
      })
      if (parseInt(this.OtpManual) === this.vaildotp[0].otp) {
        if (this.vaildotp.length !== 0 && (parseInt(this.vaildotp[0].OtpValidation) === 1 || parseInt(this.vaildotp[0].OtpValidation) === 2 || parseInt(this.vaildotp[0].OtpValidation) === 3)) {
          this.service.UpdateOtpValidation(this.otpvaildation, this.UserEmpid, this.userloc, this.OtpManual, this.Frmdate1).subscribe((data: any) => {
            this.updateotpVaild = data
            // console.log(this.updateotpVaild, 'update');
            if (this.updateotpVaild[0].status === 'Y') {
              this.service.InsertOtpDet(this.Empname, this.UserEmpid, this.Frmdate, this.Otprandom).subscribe((data: any) => {
                const InsertOtpDetalis = data
                // console.log(InsertOtpDetalis, 'InsertOtpDetalis');
                if (InsertOtpDetalis[0].status === 'Y') {
                  this.router.navigate(['/Dashboard'], {});
                }
              })
            } else {
              this.toastr.error(this.updateotpVaild[0].Msg)
              return
            }
          })
        }
      } else {
        this.toastr.error('Entered Otp is Wrong..Please Check...')
        return
      }
    }
  }

  ExisitingOtpUpdateData: any[] = new Array()
  ExisitingOtpUpdateN() {
    this.status = 'N'
    this.visible = true;
  }
  ExisitingOtpUpdateY() {
    this.status = 'Y'
    this.visible = true;
    this.service.Emailotp(this.Frm_emailId, this.ToMailid, this.MailContentOtp).subscribe((data: any) => {
      const a = document.getElementById("clk") as HTMLButtonElement
      a.disabled = true;
      this.Otpsucess = true
      this.Otp = data
      this.Otpsucess = false
    })
  }
  visible: boolean = false
  showDialog() {
    this.visible = true;
  }
}

