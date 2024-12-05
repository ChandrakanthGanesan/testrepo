import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  Menuform!: FormGroup;
  Logoutform!: FormGroup;
  LoactionId: number = 0
  displayedColumns: string[] = ['S.No', 'Empid', 'Menuname', 'MenuId', 'LocationId', 'DeptId', 'Status', 'ApprovedBy'];
  displayedLoginuser: string[] = ['S.No', 'Empname', 'LocationId', 'LoginSystem', 'LoginTime','LogoutTime'];
  i: any;
  constructor(private service: AdminService, private spinners: NgxSpinnerService, private formBuilder: FormBuilder, private loginservice: LoginService, private toastr: ToastrService) {

  }
  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }

  ngOnInit(): void {

    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LoactionId = data[data.length - 1]
    

    this.Menuform = this.formBuilder.group({
      modulname: new FormControl('', Validators.required),
      Loaction: new FormControl('', Validators.required),
      Dept: new FormControl('', Validators.required),
      Emp: new FormControl('', Validators.required),
      ApprovedBy: new FormControl('', Validators.required),
    })
    this.Logoutform = this.formBuilder.group({
      Loaction: new FormControl('', Validators.required),
      Dept: new FormControl('', Validators.required),
      Emp: new FormControl('', Validators.required),
    })
    this.GetMenu()
    this.getview()
  }
  apiErrorMsg: string = ''
  MenuNameData: any[] = new Array()
  GetMenu() {
    this.service.menuname().subscribe({
      next: (res: any) => {
        this.MenuNameData = res
 
      },
      error: (err: any) => {
        this.apiErrorMsg = err
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  menuid: number = 0
  MenuEvent(event: any) {
    this.menuid = event
    const menu = this.MenuNameData.forEach((data: any) => {
      if (data.Menuid === this.menuid) {
        this.menuname = data.Menuname
      }
    })
    this.GetDept()
  }

  Department: any[] = new Array()
  GetDept() {
    this.service.dept().subscribe({
      next: (data: any) => {
        this.Department = data
        console.log(this.Department, 'dept');
      },
      error: (err: any) => {
        this.apiErrorMsg = err
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  DeptEvent(event: any) {
    this.Deptid = parseInt(event)
    console.log(this.Deptid, 'deptid');
    this.GetEmp()
  }
  Deptid: number = 0
  Employee: any[] = new Array()
  GetEmp() {
    this.service.Emp(this.Deptid).subscribe({
      next: (data: any) => {
        this.Employee = data
        console.log(this.Employee, 'dept');
      },
      error: (err: any) => {
        this.apiErrorMsg = err
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  Empid: any
  EmpEvent(event: any) {
    this.Empid = parseInt(event.target.value)
    this.Location()
    this.Getpoweruser()
  }
  Location() {
    this.service.Location().subscribe({
      next: (data: any) => {
        this.LocationData = data
        console.log(this.LocationData, 'location');
      },
      error: (err: any) => {
        this.apiErrorMsg = err
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })

  }

  UserLocationidArr: any[] = new Array
  UserLocationid: any
  Locid: any
  Locationevent(event: any) {
    this.UserLocationid = parseInt(event.value)
    this.Locid = event.value

    console.log(this.Locid);


    this.Approverd()

  }

  // getSelectedValuesAsString(): string {
  //   return this.UserLocationid.join(', ');
  // }
  LocationData: any[] = new Array()
  AppovedData: any[] = new Array()
  Approverd() {
    this.service.Approved().subscribe({
      next: (data: any) => {
        this.AppovedData = data
        console.log(this.AppovedData, 'approve');
      },
      error: (err: any) => {
        this.apiErrorMsg = err
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  get Menu(): { [key: string]: AbstractControl } {
    return this.Menuform.controls;
  }
  Menubtn: any;
  userRighitsData: any[] = new Array
  Approve() {
    this.Menubtn = true
    if (this.Menuform.invalid) {
      return
    } else {

      this.UserLocationidArr = []
      for (let i = 0; i < this.Locid.length; i++) {
        this.UserLocationidArr.push(this.Locid[i])
        console.log(this.UserLocationidArr, 'sd');
      }
      for (let i = 0; i < this.UserLocationidArr.length; i++) {
        this.service.RighitsCheck(this.Empid, this.UserLocationidArr[i], this.menuid).subscribe({
          next: (data: any) => {
            this.userRighitsData = data
            console.log(this.userRighitsData);
            if (this.userRighitsData.length !== 0) {
              for (let i = 0; i < this.userRighitsData.length; i++) {
                if (this.userRighitsData[i].Locationid === this.UserLocationidArr[i]) {
                  this.toastr.warning('You cannot give the Rights for Same Location. Please Check...')
                  this.UserLocationid = ''
                  return
                }
              }
            } else {
              const saveacess = document.getElementById('saveaccess') as HTMLElement;
              saveacess.click()
            }
          },
          error: (err: any) => {
            this.apiErrorMsg = err
            const Error = document.getElementById('apierror') as HTMLInputElement
            Error.click()
            return
          }
        })
      }
      this.userRighitsData = []
    }
  }
  SaveAccess() {

  }

  poweruser: any[] = []
  Getpoweruser() {
    this.service.poweruser(this.Empid).subscribe({
      next: (data: any) => {
        this.poweruser = data
        console.log(this.poweruser);
      },
      error: (err: any) => {
        this.apiErrorMsg = err
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  RightsUpdate: any = new Array()
  appprovedBy: string = ''
  RightsDet: any = new Array()
  menuname: string = ''
  Status: string = 'Y'
  Success: string = ''
  Success_Error: string = ''
  Approvebtn() {
    const aprrove = this.AppovedData.forEach((data: any) => {
      if (data.Empid === parseInt(this.Menuform.controls['ApprovedBy'].value)) {
        this.appprovedBy = data.EmpName
      }
    })
    this.RightsUpdate = []
    for (let i = 0; i < this.UserLocationidArr.length; i++) {
      // this.Empid=154311
      this.RightsUpdate.push({
        Empid: this.Empid,
        ModuleId: this.menuid,
        LocationId: this.UserLocationidArr[i],
        DeptId: this.Deptid,
        PowerUser: this.poweruser[0].power_user,
        Menuname: this.menuname,
        Status: this.Status,
        ApprovedBy: this.appprovedBy
      })
    }
    console.log(this.RightsUpdate, 'save');
    this.service.Save(this.RightsUpdate).subscribe({
      next: (data: any) => {
        this.RightsDet = data
        console.log(this.RightsDet);
        this.Success = this.RightsDet[0].status
        this.Success_Error = this.RightsDet[0].Msg
        if (this.RightsDet[0].status === 'Y') {
          const success = document.getElementById('RightsSave') as HTMLInputElement
          success.click()
        } else {
          const success = document.getElementById('RightsSave') as HTMLInputElement
          success.click()
        }
      },
      error: (err: any) => {
        this.apiErrorMsg = err
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  Tab1 = 0;
  tablabelname: string = '';
  tabChangedRegular(e: MatTabChangeEvent) {
    this.Tab1 = e.index;
    this.tablabelname = e.tab.textLabel
    console.log(this.tablabelname);
    if (this.tablabelname === 'VIEW') {
      this.GetDept()
      this.Location()
    }
    if (this.tablabelname === 'Logout') {
      this.GetDept()

    }
  }
  RightsDetView: any[] = new Array()
  UserRightsCheck: boolean = false
  view() {
    this.service.View(this.Empid, this.Deptid, this.UserLocationid).subscribe((data: any) => {
      this.RightsDetView = data
      console.log(this.RightsDetView);
      if (this.RightsDetView.length > 0) {
        this.UserRightsCheck = true
      } else {
        this.toastr.warning('No Records To Found...')
      }
    })
  }
  unapprove() {
    this.Menubtn = true
    if (this.Menuform.invalid) {
      return
    } else {
      this.service.Unapprove(this.menuid, this.Empid, this.Deptid, this.LoactionId).subscribe((data: any) => {
        const unapprove = data
        console.log(unapprove);
        this.Success = unapprove[0].status
        this.Success_Error = unapprove[0].Msg
        if (this.Success === 'Y') {
          const success = document.getElementById('RightsSave') as HTMLInputElement
          success.click()
        } else {
          const success = document.getElementById('RightsSave') as HTMLInputElement
          success.click()
        }
      })
    }
  }
  FinalSave() {
    this.RightsUpdate = []
    setTimeout(() => {
      window.location.reload();
    });
  }
  data: any
  errorMessage: string = ''
  getview() {
    this.service.View1().subscribe({
      next: (response) => {
        this.data = response;
        console.log(this.data);

      },
      error: (error) => {
        this.toastr.error(error)
      }
    });

  }
  logoutdeptid: number = 0
  logoutDeptEvent(a: any) {
    this.logoutdeptid = a
    console.log(this.logoutdeptid);
    if (this.logoutdeptid > 0) {
      this.service.Emp(this.logoutdeptid).subscribe({
        next: (data: any) => {
          this.Employee = data
          console.log(this.Employee, 'dept');
        },
        error: (err: any) => {
          this.apiErrorMsg = err
          const Error = document.getElementById('apierror') as HTMLInputElement
          Error.click()
          return
        }
      })
    } else {
      return;
    }
  }

  logoutEmpid: number = 0
  logoutEmpEvent(a: any) {
    this.logoutEmpid = a.target.value
    console.log(this.logoutEmpid);
    if (this.logoutEmpid > 0) {
      this.service.Location().subscribe({
        next: (data: any) => {
          this.LocationData = data
          console.log(this.LocationData, 'location');
        },
        error: (err: any) => {
          this.apiErrorMsg = err
          const Error = document.getElementById('apierror') as HTMLInputElement
          Error.click()
          return
        }
      })
    }
  }
  logoutLocid: number = 0
  LogutLocationevent(a: any) {
    this.logoutLocid = a.target.value
    console.log(this.logoutLocid);
  }
  ViewLoginUserDet:any[]=new Array()
  ViewLogin:boolean=false
  Viewloginuser(){
    this.loginservice.ViewloginuserDet(this.Logoutform.controls['Emp'].value,this.Logoutform.controls['Loaction'].value).subscribe((res:any)=>{
      this.ViewLoginUserDet=res
      console.log(this.ViewLoginUserDet);
      if(this.ViewLoginUserDet.length>0){
        this.ViewLogin=true
      }
    })
  }
  ErrorMsg: string = ''
  Updatelogout={}
  LogoutEmp() {
    this.Updatelogout={
      LocationId:this.Logoutform.controls['Loaction'].value,
      Empid: this.logoutEmpid ,
      LoginSystem: 'Tab-Entry'
    }
    console.log(this.Updatelogout,'this.Updatelogout');
    this.loginservice.updateuserDetlogout(this.Updatelogout).subscribe({
      next: (res: any) => {
        const logout = res
        if (logout[0].status === 'Y') {
          this.ErrorMsg = "You Logout " + this.Empid + ""
          console.log(this.ErrorMsg);
          // const view = document.getElementById('Error') as HTMLInputElement
          // view.click()
        } else {
          return;
        }
      },
    })
  }
  spinner() {
    this.spinners.show()
  }
}
