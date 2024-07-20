import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  ngOnInit() {
  // this. Disablebackbutton()
  }
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChild('myModals') myModals!: ElementRef;
  @ViewChild('close') close!: ElementRef;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    back(){

      window.history.back();

    }

}
