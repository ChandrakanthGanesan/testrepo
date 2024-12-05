import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, Subject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor() { }
  private idle: Observable<any> = new Observable();
  private timer: Subscription = new Subscription();
  private timeOutMilliSeconds: number = 1000;
  private idleSubscription: Subscription = new Subscription();
  public expired: Subject<boolean> = new Subject<boolean>();

  public startWatching(timeOutSeconds: number): Observable<any> {

    this.idle = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'click'),
      fromEvent(document, 'mousedown'),
      fromEvent(document, 'keypress'),
      fromEvent(document, 'DOMMouseScroll'),
      fromEvent(document, 'mousewheel'),
      fromEvent(document, 'touchmove'),
      fromEvent(document, 'MSPointerMove'),
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'resize')
    );
    this.timeOutMilliSeconds = timeOutSeconds * 1000;
    this.idleSubscription = this.idle.subscribe((res) => {
      // console.log(res,'idle');

      this.resetTimer();
    });


    this.startTimer();
    return this.expired;
  }
  private startTimer() {
    this.timer = timer(this.timeOutMilliSeconds, this.timeOutMilliSeconds).subscribe((res) => {
     console.log(res,'start');
       this.expired.next(true);
     });
   }



   public resetTimer() {
     this.timer.unsubscribe();
     this.startTimer();
   }


   public stopTimer() {
     this.timer.unsubscribe();
     this.idleSubscription.unsubscribe();
   }

}
