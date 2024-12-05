import { Component } from '@angular/core';
import { LogoutService } from './service/logout.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreIssueService } from './service/store-issue.service';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Commerical';
  LoactionId: number = 0
  Empid: number = 0
  Updatelogout = {}
  constructor(private logoutservice: LogoutService, private loginservice: LoginService, private router: Router, private toaster: ToastrService, private storeissueservice: StoreIssueService) { }
  ngOnInit(): void {
    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LoactionId = data[data.length - 1]
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = 154234
    this.initialIdleSettings();
    this.storeissuelogout()

  }

  private initialIdleSettings() {
    const idleTimeoutInSeconds: number = 20 * 60;
    this.logoutservice.startWatching(idleTimeoutInSeconds).subscribe((isTimeOut: boolean) => {
      if (isTimeOut) {
        this.Updatelogout = {
          LocationId: this.LoactionId,
          Empid: this.Empid,
          LoginSystem: 'Tab-Entry'
        }
        this.loginservice.updateuserDetlogout(this.Updatelogout).subscribe({
          next: (res: any) => {
            const logout = res
            this.toaster.warning(logout);
            this.router.navigate(['/',])
            sessionStorage.clear();
            localStorage.clear()
            return
          },
        })
        return
      }
    });
  }
  StoreIssueId: number = 460
  Updatelockscreen = {}
  LoginSystem: string = ''
  storeissuelogout() {
    this.StoreIssueId = 166
    this.Updatelockscreen = {}
    this.Updatelockscreen = {
      LocationId: this.LoactionId,
      EmpId: this.Empid,
      ModuleId: this.StoreIssueId,
      Loginsystem: 'Tab-Entry'
    }
    this.storeissueservice.Updatelogoutime(this.Updatelockscreen).subscribe({
      next: (res: any) => {
        const updatelockscrrentime = res
      },
    })
  }


}
