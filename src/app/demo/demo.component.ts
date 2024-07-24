
import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { FormBuilder } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DemoComponent  {



  savebtn:boolean=false

  constructor(private fb: FormBuilder) { }
  ngOnInit() {

    const save =document.getElementById('submit')as HTMLInputElement

    fromEvent(save, 'click').subscribe(event => {
      console.log('Button clicked', event);
      this.savebtn=true
    });
  }






}
