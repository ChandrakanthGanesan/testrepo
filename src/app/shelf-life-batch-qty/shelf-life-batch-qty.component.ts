import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelflifeService } from '../service/selflife.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { data } from 'jquery';

@Component({
  selector: 'app-shelf-life-batch-qty',
  templateUrl: './shelf-life-batch-qty.component.html',
  styleUrls: ['./shelf-life-batch-qty.component.scss']
})
export class ShelfLifeBatchQtyComponent implements OnInit {
  displayedColumns: string[] = ['GRN_Date', 'Rawmatname', 'Spilt', 'UOM', 'Qty', 'Rate'];
  LocationId: number = 0
  selflife!: FormGroup
  Empid: string = ''
  @ViewChild('updatebtncheck') updatebtncheck!: ElementRef
  @ViewChild('invalidfocus') invalidfocus!: ElementRef
  constructor(private date: DatePipe, private service: SelflifeService, private fb: FormBuilder, private spinnerService: NgxSpinnerService,) { }
  ngOnInit() {

    this.selflife = this.fb.group({
      GrnRefno: new FormControl(''),
      party: new FormControl('', Validators.required),
      dcno: new FormControl('', Validators.required),
      partyid: (''),
      Grnno: ('')
    })

    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LocationId = data[data.length - 1]
    console.log(this.LocationId);
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    console.log(this.Empid);
    this.getGrnno()
  }
  GrnnoData: any[] = new Array()
  errorMessage: string = ''
  ReturnError:string=''
  getGrnno() {
    this.spinnerService.show()
    this.LocationId=2
    this.service.GrnNo(this.LocationId).subscribe({next: (res) => {
        this.spinnerService.hide()
        this.GrnnoData = res
        console.log(this.GrnnoData);
        if (this.GrnnoData.length === 1) {
          this.selflife.controls['GrnRefno'].setValue(this.GrnnoData[0].GRN_Ref_No)
          this.selflife.controls['Grnno'].setValue(this.GrnnoData[0].GRN_NO)
          console.log(this.selflife.controls['Grnno'].value);
          this.getSupplier()
        } else {
          if (this.selflife.controls['Grnno'].value === 0) {
            this.Error = 1
            const Error = document.getElementById('Error') as HTMLInputElement
            Error.click()
            return
          }
        }
      },
      error: (error) => {
        this.errorMessage = error;
        const Error=document.getElementById('apierror')as HTMLInputElement
        Error.click()
      }
    })
  }
  GRNo(e: any) {
    let grnno = parseInt(e)
    console.log(grnno);
    this.selflife.controls['Grnno'].setValue(grnno)
    console.log(this.selflife.controls['Grnno'].value);
    this.getSupplier()
  }
  SupplierData: any[] = new Array()
  getSupplier() {
    this.service.Supplier(this.selflife.controls['Grnno'].value).subscribe({next:(data: any) => {
      this.SupplierData = data
      console.log(this.SupplierData);
      if (this.SupplierData.length === 1) {
        this.selflife.controls['party'].setValue(this.SupplierData[0].PartyName)
        this.selflife.controls['dcno'].setValue(this.SupplierData[0].Grn_Dc_No)
        this.selflife.controls['partyid'].setValue(this.SupplierData[0].PartyId)
      }
      else {
        this.Error = 2
        const Error = document.getElementById('Error') as HTMLInputElement
        Error.click()
        return
      }
    },
    error: (error) => {
      this.errorMessage = error;
      const Error=document.getElementById('apierror')as HTMLInputElement
      Error.click()
    },
    complete() {
        console.log('complete');
    },
    })
  }
  supplierEvent(e: any) {
    let supId = parseInt(e)
    console.log(supId);
    this.selflife.controls['partyid'].setValue(supId)
  }
  get view(): { [key: string]: AbstractControl } {
    return this.selflife.controls;
  }
  Viewbtn: any
  ViewItem: any[] = new Array()
  Viewclick: boolean = false
  View() {
    this.Viewbtn=true
    if(this.selflife.invalid){
      this.invalidfocus.nativeElement.focus();
      return
    }
    else{
      this.service.Viewbtn(this.selflife.controls['Grnno'].value).subscribe({next:(data: any) => {
        this.ViewItem = data
        this.Viewclick = true
        console.log(this.ViewItem);
      },
      error: (error) => {
        this.errorMessage = error;
        const Error=document.getElementById('apierror')as HTMLInputElement
        Error.click()
      }
      })
    }
  }
  SplitBtachwiseArr: any[] = new Array()
  GrnQty: any
  mainatbelIndex: number = 0
  SpiltBatchwise(Index: number) {
    this.mainatbelIndex = Index
    this.SplitBtachwiseArr.push({
      TotalQty: this.ViewItem[Index].GRN_Qty,
    })
    this.GrnQty = this.SplitBtachwiseArr[Index].TotalQty
  }

  SplitBatchwiseIndex: number = 0
  SpiltQtyEvent(Index: number) {
    const SplitQty = this.SplitBtachwiseArr.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.SplitQty), 0);
    if (parseFloat(this.SplitBtachwiseArr[0].TotalQty) < parseFloat(SplitQty)) {
      this.SplitBtachwiseArr[Index].SplitQty = ''
      this.ReturnError='Y'
      this.Error = 3
      const Error = document.getElementById('Error') as HTMLInputElement
      Error.click()
      return
    }
    for (let i = 0; i < this.SplitBtachwiseArr.length; i++) {
      if (parseFloat(this.SplitBtachwiseArr[i].TotalQty) !== parseFloat(SplitQty)) {
        this.Addbtndisable[Index] = false
        this.UpdateBtndisable = true
      } else {
        this.Addbtndisable[Index] = true
        this.UpdateBtndisable = false
      }
    }

  }
  Addbtndisable = [true, true]
  add(Index: number) {

    let SplitQty = this.SplitBtachwiseArr[Index].SplitQty
    let Batchno = this.SplitBtachwiseArr[Index].Batchno
    let Expirydate = this.SplitBtachwiseArr[Index].Expirydate
    let Manfacturedate = this.SplitBtachwiseArr[Index].Manfacturedate
    if (SplitQty === 0 || SplitQty === undefined || SplitQty === '') {
      this.Error = 4
      const Error = document.getElementById('Error') as HTMLInputElement
      Error.click()
      return
    }
    else if (Batchno === 0 || Batchno === undefined || Batchno === '') {
      this.Error = 5
      const Error = document.getElementById('Error') as HTMLInputElement
      Error.click()
      return
    }
    else if (Expirydate === 0 || Expirydate === undefined || Expirydate === '') {
      this.Error = 6
      const Error = document.getElementById('Error') as HTMLInputElement
      Error.click()
      return
    }
    else if (Manfacturedate === 0 || Manfacturedate === undefined || Manfacturedate === '') {
      this.Error = 7
      const Error = document.getElementById('Error') as HTMLInputElement
      Error.click()
      return
    }
    else {
      const SplitQty = this.SplitBtachwiseArr.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.SplitQty), 0);
      if (parseInt(this.SplitBtachwiseArr[0].TotalQty) !== parseFloat(SplitQty)) {
        this.SplitBtachwiseArr.push({
          TotalQty: this.ViewItem[this.mainatbelIndex].GRN_Qty,
          SplitQty: '',
          Batchno: '',
          Expirydate: '',
          Manfacturedate: ''
        })
        this.Addbtndisable[Index] = true
        console.log(this.SplitBtachwiseArr);
      } else {
        this.Error = 8
        const Error = document.getElementById('Error') as HTMLInputElement
        Error.click()
        return
      }

      if (parseInt(this.SplitBtachwiseArr[0].TotalQty) !== parseFloat(SplitQty)) {
        this.UpdateBtndisable = false
      }
    }
  }
  DeleteBatchSplit(Index: number) {
    this.SplitBatchwiseIndex = Index
    if (this.SplitBtachwiseArr.length > 1) {
      this.SplitBtachwiseArr.splice(Index, 1)
    }
  }
  Error: number = 0
  selflifeupdate: any[] = new Array()
  OldBatchQty: any[] = new Array()
  UpdateVaild() {
    const SplitQty = this.SplitBtachwiseArr.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.SplitQty), 0);
    if (parseInt(this.SplitBtachwiseArr[0].TotalQty) === parseFloat(SplitQty)) {
      this.service.BatchQtyVaildation(this.SplitBtachwiseArr[0].TotalQty).subscribe((data: any) => {
        this.OldBatchQty = data
        if (this.OldBatchQty.length > 0) {
          this.Error = 9
          const OldBatchqty = document.getElementById('Error') as HTMLInputElement
          OldBatchqty.click()
          return
        } else {
          const save = document.getElementById('Savemenu') as HTMLInputElement
          save.click()
          return
        }
      })
    } else {
      this.Error = 10
      const save = document.getElementById('Error') as HTMLInputElement
      save.click()
      return
    }
  }
  UpdateBtndisable: boolean = true
  BatchQtyVaild() {
    this.UpdateBtndisable = true
  }
  SelflifeSave: any[] = new Array()
  Msg: string = ''
  Status: string = ''
  Update() {
    this.selflifeupdate = []
    for (let i = 0; i < this.ViewItem.length; i++) {
      for (let j = 0; j < this.SplitBtachwiseArr.length; j++) {
        this.selflifeupdate.push({
          GRN_NO: this.selflife.controls['Grnno'].value,
          GRN_Id: this.ViewItem[i].GRN_Id,
          RawmatId: this.ViewItem[i].Rawmatid,
          Batchno: this.SplitBtachwiseArr[j].Batchno,
          BatchQty: this.SplitBtachwiseArr[j].SplitQty,
          BatchDate: this.SplitBtachwiseArr[j].Manfacturedate,
          ModfifyDate: this.SplitBtachwiseArr[j].Expirydate,
          Rate: this.ViewItem[i].GRN_BasicPrice,
          Empid: this.Empid
        })
      }
    }
    console.log(this.selflifeupdate, 'saveArray');
    // this.spinnerService.show()
    // this.service.Save(this.selflifeupdate).subscribe({(data: any) => {
    //   this.spinnerService.hide()
    //   this.SelflifeSave = data
    //   console.log(this.SelflifeSave, 'Save');
    //   this.Msg=this.SelflifeSave[0].Msg
    //   this.Status=this.SelflifeSave[0].status
    //   if(this.Status === 'Y'){
    //     const save=document.getElementById('save')as HTMLInputElement
    //     save.click()
    //   }else{
    //     const save=document.getElementById('save')as HTMLInputElement
    //     save.click()
    //   }
  // },
    // error: (error) => {
    //   this.errorMessage = error;
    //   const Error=document.getElementById('apierror')as HTMLInputElement
    //   Error.click()
    // }
    // })
  }

  finalSave() {
    this.selflifeupdate = []
    this.ViewItem = []
    this.SplitBtachwiseArr = []
    this.selflife.reset()
    this.Viewbtn = false
  }
  close() {
    this.SplitBtachwiseArr = []

  }

}
