import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-inventory-main-module',
  templateUrl: './inventory-main-module.component.html',
  styleUrls: ['./inventory-main-module.component.scss']
})
export class InventoryMainModuleComponent implements OnInit {

  Menuname: string = ''
  sidenavWidth = 4;
  LocationId: number = 0
  Empid: number = 0
  MOduleId: any
  PurchaseRequest: boolean = false
  IssueRequest: boolean = false
  DirectIndent: boolean = false
  StoreIssue: boolean = false
  MatlReturnFrmDept: boolean = false
  ReworkIssue: boolean = false
  StorageQtyAlloc: boolean = false
  Shelflife: boolean = false
  StoretoStore: boolean = false
  Storelogout: boolean = false
  StorelogoutId: number = 549
  PurchaseReqId: number = 363
  IssueRequestId: number = 236
  DirectIndentId: number = 141
  StoreIssueId: number = 460
  MatlReturnFrmDeptId: number = 272
  ReworkIssueId: number = 385
  StorageQtyAllocId: number = 458
  ShelflifeId: number = 429
  StoretoStoreId: number = 459
  Poweruser: string = ''
  empid: number = 458
  userRighitsData: any[] = new Array()
  EmpName: string = '';
  @ViewChild('message') message!: ElementRef
  constructor(private router: Router, private service: LoginService, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LocationId = data[data.length - 1]

    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    this.EmpName = user[0].empname
    this.service.RighitsCheck(this.Empid, this.LocationId).subscribe({
      next: (data: any) => {
        this.userRighitsData = data
        for (let i = 0; i < this.userRighitsData.length; i++) {
          if (parseInt(this.userRighitsData[i].Modules) === this.PurchaseReqId) {
            if (this.userRighitsData[i].PowerUser === 'N') {
              if (this.userRighitsData[i].Status === 'Y') {
                this.PurchaseRequest = true
              }
            } else {
              this.PurchaseRequest = true
            }
          }
          if (parseInt(this.userRighitsData[i].Modules) === this.IssueRequestId) {
            if (this.userRighitsData[i].PowerUser === 'N') {
              if (this.userRighitsData[i].Status === 'Y') {
                this.IssueRequest = true
              }
            } else {
              this.IssueRequest = true
            }
          }
          if (parseInt(this.userRighitsData[i].Modules) === this.DirectIndentId) {
            if (this.userRighitsData[i].PowerUser === 'N') {
              if (this.userRighitsData[i].Status === 'Y') {
                this.DirectIndent = true
              }
            } else {
              this.DirectIndent = true
            }
          }
          if (parseInt(this.userRighitsData[i].Modules) === this.StoreIssueId) {
            if (this.userRighitsData[i].PowerUser === 'N') {
              if (this.userRighitsData[i].Status === 'Y') {
                this.StoreIssue = true
              }
            } else {
              this.StoreIssue = true
            }
          }
          if (parseInt(this.userRighitsData[i].Modules) === this.MatlReturnFrmDeptId) {
            if (this.userRighitsData[i].PowerUser === 'N') {
              if (this.userRighitsData[i].Status === 'Y') {
                this.MatlReturnFrmDept = true
              }
            } else {
              this.MatlReturnFrmDept = true
            }
          }
          if (parseInt(this.userRighitsData[i].Modules) === this.ReworkIssueId) {
            if (this.userRighitsData[i].PowerUser === 'N') {
              if (this.userRighitsData[i].Status === 'Y') {
                this.ReworkIssue = true
              }
            } else {
              this.ReworkIssue = true
            }
          }
          if (parseInt(this.userRighitsData[i].Modules) === this.StorageQtyAllocId) {
            if (this.userRighitsData[i].PowerUser === 'N') {
              if (this.userRighitsData[i].Status === 'Y') {
                this.StorageQtyAlloc = true
              }
            } else {
              this.StorageQtyAlloc = true
            }
          }
          if (parseInt(this.userRighitsData[i].Modules) === this.ShelflifeId) {
            if (this.userRighitsData[i].PowerUser === 'N') {
              if (this.userRighitsData[i].Status === 'Y') {
                this.Shelflife = true
              }
            } else {
              this.Shelflife = true
            }
          }
          if (parseInt(this.userRighitsData[i].Modules) === this.StoretoStoreId) {
            if (this.userRighitsData[i].PowerUser === 'N') {
              if (this.userRighitsData[i].Status === 'Y') {
                this.StoretoStore = true
              }
            } else {
              this.StoretoStore = true
            }
          }
          if (parseInt(this.userRighitsData[i].Modules) === this.StorelogoutId) {
            if (this.userRighitsData[i].PowerUser === 'N') {
              if (this.userRighitsData[i].Status === 'Y') {
                this.Storelogout = true
              }
            } else {
              this.Storelogout = true
            }
          }
        }
      },
      error: (err) => {
        this.apiErrorMsg = err
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        // this.spinner.show()
        return
      },
      complete: () => {
        this.spinner.hide()
      },
    })
  }

  apiErrorMsg: string = ''
  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }

  Logout() {
    this.router.navigate(['/login'], {});
  }
  Back() {
    this.router.navigate(['/Dashboard'], {});
  }
  Spinnercall() {
    this.spinner.show()
  }
  screenlockvaildation: any[] = new Array()
  ErrorMsg: string = ''
  Error: number = 0
  EmpData: any[] = new Array()
  InsertloginDet = {}
  getScreenLockVaildation() {
    console.log('esarughfwaefyeiryf8eqytr');
    this.StoreIssueId = 166
    this.service.screenlockvaild(this.StoreIssueId, this.LocationId).subscribe({
      next: (res: any) => {
        this.screenlockvaildation = res
        console.log(this.screenlockvaildation, 'screenlockvaildation');
        console.log(this.screenlockvaildation.length);
        if (this.screenlockvaildation.length > 0) {
          this.Error = 1
          this.ErrorMsg = ''
          this.ErrorMsg = 'Store Issue Already Logged By Login Name : ' + this.screenlockvaildation[0].empname + 'Please Ensure that person Logout the Store Issue';
          // console.log(this.ErrorMsg);
          this.message.nativeElement.click()
          return
        } else {
          this.InsertloginDet = {}
          this.InsertloginDet = {
            Menuid: this.StoreIssueId,
            LocationId: this.LocationId,
            Empid: this.Empid,
            Loginsystem: 'Tab-Entry'
          }
          this.service.Insertlockscreen(this.InsertloginDet).subscribe({
            next: (res: any) => {
              console.log('else');
              const insertuserdata = res
              console.log(insertuserdata, 'insertuserdata');
              if (insertuserdata[0].status === 'Y') {
                this.ErrorMsg = ''
                this.ErrorMsg = insertuserdata[0].Msg
                console.log(this.ErrorMsg, 'dsf');
                // this.message.nativeElement.click()
                this.router.navigate(['/storeissue'], {});
              } else {
                this.ErrorMsg = ''
                this.ErrorMsg = insertuserdata[0].Msg
                this.message.nativeElement.click()
              }
            },
            error: (err) => {
              this.apiErrorMsg = err
              const Error = document.getElementById('apierror') as HTMLInputElement
              Error.click()
              // this.spinner.show()
              return
            }
          })
        }
      },
      error: (err) => {
        this.apiErrorMsg = err
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        // this.spinner.show()
        return
      }
    })
  }


}

