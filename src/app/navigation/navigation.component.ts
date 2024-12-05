import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(private Router: Router, private service: LoginService) { }
  LoactionId: number = 0
  Empid: number = 0
  ngOnInit() {
    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LoactionId = data[data.length - 1]
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = 154234
  } 
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChild('myModals') myModals!: ElementRef;
  @ViewChild('close') close!: ElementRef;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  back() {
    this.Router.navigate(['/Dashboard'], {});
  }
  ErrorMsg: string = ''
  Updatelogout={}
  Logout() {
    this.Updatelogout={}
    this.Updatelogout={
      LocationId:this.LoactionId,
      Empid:this.Empid,
      LoginSystem:'Tab-Entry'
    }
    console.log(this.Updatelogout,'this.Updatelogout');

    this.service.updateuserDetlogout(this.Updatelogout).subscribe({
      next: (res: any) => {
        const logout = res
        console.log(logout,'logout');
        if (logout.length > 0) {
          if (logout[0].status === 'Y') {
            this.Router.navigate(['/login'], {});
            this.ErrorMsg = ''
            this.ErrorMsg = logout[0].Msg
            const view = document.getElementById('Error') as HTMLInputElement
            view.click()
            return;
          } else {
            this.Router.navigate(['/login'], {});
          }
        } else {
          return;
        }
      },
    })
  }
}
