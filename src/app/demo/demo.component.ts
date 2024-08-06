
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DemoComponent implements OnInit {
  Registerform!: FormGroup
  choices = [
    {
      "Gender": "Male",
      "GenderId": 1,
    },
    {
      "Gender": "Female",
      "GenderId": 2,
    },
    {
      "Gender": "Transgender",
      "GenderId": 3,
    }
  ]
  displayedColumns: string[] = ['S.No', 'Email', 'Address', 'mobilenumber', 'pincode'];
  RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  constructor(private Fb: FormBuilder) { }
  ngOnInit() {
    this.Registerform = this.Fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      lname: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.RegExp)]],
      Gender: [''],
      Address: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]],
      mobilenumber: ['', [Validators.required, Validators.maxLength(10)]],
      pincode: ['', Validators.required]
    })
  }


  submitbtn: any
  RegistrationArray: any[] = new Array()
  Submit() {
    this.submitbtn = true
    if (this.Registerform.invalid) {
      return
    } else {
      if (this.RegistrationArray.length > 0) {
        this.RegistrationArray.forEach(res => {
          if (res.Email === this.Registerform.controls['Email'].value) {
            alert('Same mailId Cannot to be add')
            return
          }
          else if (res.mobilenumber === this.Registerform.controls['mobilenumber'].value) {
            alert('Same Phone Number Cannot to be add')
            return
          }
          this.RegistrationArray.push({
            Name: this.Registerform.controls['name'].value,
            LName: this.Registerform.controls['lname'].value,
            Email: this.Registerform.controls['Email'].value,
            password: this.Registerform.controls['password'].value,
            Address: this.Registerform.controls['Address'].value,
            mobilenumber: this.Registerform.controls['mobilenumber'].value,
            pincode: this.Registerform.controls['pincode'].value,
          })
          console.log(this.RegistrationArray, 'this.RegistrationArray');
        })
      } else {
        this.RegistrationArray.push({
          Name: this.Registerform.controls['name'].value,
          LName: this.Registerform.controls['lname'].value,
          Email: this.Registerform.controls['Email'].value,
          password: this.Registerform.controls['password'].value,
          Address: this.Registerform.controls['Address'].value,
          mobilenumber: this.Registerform.controls['mobilenumber'].value,
          pincode: this.Registerform.controls['pincode'].value,
        })
        console.log(this.RegistrationArray, 'this.RegistrationArray');
      }
    }
  }
}
