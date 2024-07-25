
import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { FormBuilder, NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DemoComponent  {



  registrationModel:any
  submitted = false;

  constructor() {}

  ngOnInit() {
    this.registrationModel = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      streetAddressLine1: '',
      streetAddressLine2: '',
      city: '',
      state: '',
      country: '',
      pincode: ''
    };
  }

  onSubmit(registationForm: NgForm) {
    if (registationForm.valid) this.submitted = true;
  }




}
