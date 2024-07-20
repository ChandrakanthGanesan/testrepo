import { Component, inject, NgZone, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { data } from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private breakpointObserver: BreakpointObserver, private service: LoginService, private zone: NgZone,) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
  }
  cols: number = 0

  gridByBreakpoint = {
    xl: 3,
    lg: 2,
    md: 3,
    sm: 2,
    xs: 1,
  }
  Empid: number = 0
  LoactionId: number = 0
  Admin: boolean = false
  userRighitsData: any[] = new Array()
  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('location') || '{}');
    this.LoactionId = data[data.length - 1]
    console.log(this.LoactionId);
    const user = JSON.parse(localStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    console.log(this.Empid);

    this.service.RighitsCheck(this.Empid, this.LoactionId).subscribe((data: any) => {
      this.userRighitsData = data
      if (this.Empid === 154311 || this.Empid === 18 || this.Empid === 132367) {
        this.Admin = true;
      }else{
        this.Admin = false;
      }
    })

  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 5 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 5 },
      ];
    })
  );
  Logout() {
    this.router.navigate(['/login'], {});
  }

}
