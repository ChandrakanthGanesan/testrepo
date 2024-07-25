import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

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
  MatlReturnFrmDept:boolean= false
  ReworkIssue:boolean= false
  StorageQtyAlloc:boolean= false
  Shelflife:boolean= false
  StoretoStore:boolean=true
  PurchaseReqId: number = 363
  IssueRequestId: number = 236
  DirectIndentId: number = 141
  StoreIssueId: number = 460
  MatlReturnFrmDeptId:number=272
  ReworkIssueId:number=385
  StorageQtyAllocId:number=458
  ShelflifeId:number=429
  StoretoStoreId:number=459
  Poweruser: string = ''
  empid: number = 458
  userRighitsData: any[] = new Array()
  constructor(private router: Router, private service: LoginService) { }
  ngOnInit(): void {
    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LocationId = data[data.length - 1]

    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    this.service.RighitsCheck(this.Empid, this.LocationId).subscribe((data: any) => {
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
      }
    })
  }


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
}

