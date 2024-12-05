import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-purchase-main-module',
  templateUrl: './purchase-main-module.component.html',
  styleUrls: ['./purchase-main-module.component.scss']
})
export class PurchaseMainModuleComponent implements OnInit {
  LocationId: number = 0
  Empid: number = 0
  EmpName: string = ''
  IndentEntry: boolean = false
  IndentEntryId: number = 228
  userRighitsData: any[] = new Array()
  apiErrorMsg:string=''
  constructor(private service: LoginService) { }
  ngOnInit() {

    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LocationId = data[data.length - 1]

    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    this.EmpName = user[0].empname
    if(this.Empid === 154311){
      this.IndentEntry=true
      this.service.RighitsCheck(this.Empid, this.LocationId).subscribe({
        next: (data: any) => {
          this.userRighitsData = data
          for (let i = 0; i < this.userRighitsData.length; i++) {
            if (parseInt(this.userRighitsData[i].Modules) === this.IndentEntryId) {
              if (this.userRighitsData[i].PowerUser === 'N') {
                if (this.userRighitsData[i].Status === 'Y') {
                  this.IndentEntry = true
                }
              } else {
                this.IndentEntry = true
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
          // this.spinner.hide()
        },
      })
    }

  }

}
