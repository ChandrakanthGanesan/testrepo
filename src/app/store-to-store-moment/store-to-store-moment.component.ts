import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StoretostoreService } from '../service/storetostore.service';
import { data, event } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'app-store-to-store-moment',
  templateUrl: './store-to-store-moment.component.html',
  styleUrls: ['./store-to-store-moment.component.scss']
})
export class StoreToStoreMomentComponent implements OnInit {
  storetostoreform!: FormGroup;
  Trandate: any
  cuurendate = new Date()
  LoactionId: number = 0
  Empid: number = 0
  cols: any
  currentDate = new Date()

  constructor(private date: DatePipe, private fb: FormBuilder, private service: StoretostoreService, private spinner: NgxSpinnerService) { }
  ngOnInit() {

    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LoactionId = data[data.length - 1]
    console.log(this.LoactionId);
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    console.log(this.Empid);
    this.storetostoreform = this.fb.group({
      Min_ref_no: new FormControl('', Validators.required),
      Trandate: new FormControl(''),
      frmwarehouse: new FormControl('', Validators.required),
      material: new FormControl('', Validators.required),
      Towarehouse: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      qty: new FormControl('', Validators.required)
    })
    this.storetostoreform.controls['Trandate'].setValue(this.date.transform(this.cuurendate, 'yyyy-MM-dd'))
    this.getpath1()
    this.getDept()
    this.RawmaterialIdData = []
  }
  RefNo: string = 'STM/'
  getpath1() {
    this.service.Path1(this.LoactionId).subscribe({
      next: (res: any) => {
        const path = res
        console.log(path);
        console.log(this.RefNo);
        this.RefNo = path[0].Compshort
      },
      error:(err) =>{
        this.apiErrorMsg = err;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      },
      complete: () => {
        this.getpath2()
      },
    })
  }
  RefNo1: string = ''
  getpath2() {
    this.service.Path2(this.date.transform(this.cuurendate, 'yyyy-MM-dd')).subscribe({
      next: (res: any) => {
        const path = res
        console.log(path, 't');
        this.RefNo = 'STM/' + this.RefNo + '/' + path[0].Yearmonth + '/'

      },
      error: (err) => {
        this.apiErrorMsg = err;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      },
      complete: () => {
        this.getpath3()
      },
    })
  }
  getpath3() {
    this.service.Path3(this.RefNo).subscribe({
      next: (res: any) => {
        const path = res
        console.log(path);
        this.storetostoreform.controls['Min_ref_no'].setValue(this.RefNo + path[0].Trano)
      },
      error: (err) => {
        this.apiErrorMsg = err;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      },
      complete: () => {
        this.getWarehouse()
      }
    })
  }
  Deptid: number = 0
  getDept() {
    this.service.Deptid(this.Empid).subscribe((data: any) => {
      const deptid = data
      this.Deptid = deptid[0].Deptid
      console.log(this.Deptid);
    })
  }
  apiErrorMsg: string = ''
  WarehouseData: any = new Array()
  getWarehouse() {
    this.service.Warehouse(this.LoactionId).subscribe({
      next: (res: any) => {
        this.WarehouseData = res
        console.log(this.WarehouseData);
      },
      error: (error) => {
        this.apiErrorMsg = error;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  TowarehouseData: any[] = new Array()
  FrmwarehouseEvent(e: any) {
    let FrmwarehouseId = e.target.value
    this.storetostoreform.controls['frmwarehouse'].setValue(parseInt(FrmwarehouseId))

  }

  ErrorMsg: string = ''
  TowarehouseEvent(e: any) {
    const TowarehouseId = parseInt(e.target.value)
    this.storetostoreform.controls['Towarehouse'].setValue(TowarehouseId)
    if (this.storetostoreform.controls['frmwarehouse'].value === this.storetostoreform.controls['Towarehouse'].value) {
      this.ErrorMsg = ''
      this.ErrorMsg = 'FromWareHouse and To WareHouse are Equal..Please Check...'
      const error = document.getElementById('Error')
      error?.click()
      this.storetostoreform.controls['Towarehouse'].setValue('')
      return
    } else {

    }
  }
  searchFn: any;
  customSearchFn(term: string, item: any) {
    return item.RawmatName.toLowerCase().startsWith(term.toLowerCase())
  }
  RawmaterialId: number = 0
  RawmaterialName: any
  Rawmat(e: any) {
    this.RawmaterialName = e.target.value
    console.log(this.RawmaterialName, 'this.RawmaterialName');
    if (this.RawmaterialName.length >= 2) {
      if (this.RawmaterialName !== null && this.RawmaterialName !== undefined && this.RawmaterialName !== '') {
        this.getRawmaterial()
      } else {
        this.RawmaterialIdData = []
        return;
      }
    } else {
      this.RawmaterialName = 0
      this.RawmaterialIdData = []
      return
    }
  }
  RawmaterialIdData: any[] = new Array()
  getRawmaterial() {
    this.service.Rawmaterial(this.RawmaterialName).subscribe({
      next: (res: any) => {
        this.RawmaterialIdData = res
      },
      error: (error) => {
        this.apiErrorMsg = error;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }

  RawmaterialChangeEvent(e: any) {
    if (this.RawmaterialId != 0 && this.RawmaterialId !== null && this.RawmaterialId !== undefined) {
      this.getStock()
    } else {
      return
    }
  }
  StockData: any[] = new Array()
  getStock() {
    this.spinner.show()
    this.service.Stockchck(this.RawmaterialId, this.LoactionId, this.storetostoreform.controls['frmwarehouse'].value).subscribe({
      next: (res: any) => {
        this.spinner.hide()
        this.StockData = res
        if (this.StockData.length > 0) {
          this.storetostoreform.controls['stock'].setValue(this.StockData[0].Stock)
        }
      },
      error: (error) => {
        this.apiErrorMsg = error;
      }
    })
  }
  get View(): { [key: string]: AbstractControl } {
    return this.storetostoreform.controls;
  }

  Viewbtn: any
  ViewStock: any[] = new Array()
  Viewclick: boolean = false
  ViewStockData: any[] = new Array()
  ViewStockData2: any
  Total: any
  getView() {
    if(this.storetostoreform.controls['stock'].value >0){
      this.spinner.show()
      this.service.ViewStock(this.LoactionId, this.storetostoreform.controls['frmwarehouse'].value, this.RawmaterialId).subscribe({
        next: (res: any) => {
          this.spinner.hide()
          this.ViewStockData = res
          console.log(this.ViewStockData, ' this.ViewStockData');
          if (this.ViewStockData.length > 0) {
            const newarr = {
              TransferQty: '',
              readOnly: false,
              allowAdd: false,
            }
            this.ViewStockData.forEach(obj => {
              Object.assign(obj, newarr);
            });
            console.log(this.ViewStockData, ' this.ViewStockData');
            this.Viewclick = true
            this.Total = this.ViewStockData.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.Stock), 0);
          }
        },
        error: (err) => {
          this.apiErrorMsg = err;
          const Error = document.getElementById('apierror') as HTMLInputElement
          Error.click()
          return
        }
      })
    }else{
      this.ErrorMsg = ''
      this.ErrorMsg = 'Stock Is Not Avialable For This Material..Please Select Another Material'
      const error = document.getElementById('Error')
      error?.click()
      return
    }

  }
  btnIndex: number = 0
  onTransferQtyInput(index: number): void {
    this.ViewStockData[index].allowAdd = this.ViewStockData[index].TransferQty !== null && this.ViewStockData[index].TransferQty > 0;
    if (this.ViewStockData[index].TransferQty === '' || this.ViewStockData[index].TransferQty === 0) {
      this.ViewStockData[index].allowAdd = false;
      this.clearReadonlyState();
    } else {
      if (parseFloat(this.ViewStockData[index].TransferQty) > this.ViewStockData[index].Stock) {
        this.Error = 1
        this.ViewStockData[index].TransferQty = ''
        this.ErrorMsg = ''
        this.ErrorMsg = 'You Cannot Enter More Than Stock'
        const error = document.getElementById('Error')
        error?.click()
        return
      } else {
        this.clearReadonlyState();
      }
    }
  }

  StockchckClearence() {
    for (let i = 0; i < this.ViewStockData.length; i++) {
      this.ViewStockData[i].allowAdd = false;
    }
  }

  isAnyUnconfirmedTransferQty(currentIndex: number): boolean {
    return this.ViewStockData.some((item, index) => {
      return index !== currentIndex && item.TransferQty !== null && item.TransferQty > 0 && !item.readOnly;
    });
  }
  // Clear readonly state for all rows
  clearReadonlyState(): void {
    this.ViewStockData.forEach((rowData: any) => {
      rowData.readOnly = false;
    });
    // for (let i = 0; i < this.ViewStockData.length; i++) {
    //   this.ViewStockData[i].readOnly
    // }

  }
  trQty: any
  transferqtydisable = [false, false]
  TransferQtyArr: any[] = new Array()

  ViewtabelIndex: any
  TransferTotal: any
  Error: number = 0
  confirmTransferQty(Index: number): void {

    if (this.ViewStockData[Index].TransferQty !== null && this.ViewStockData[Index].TransferQty > 0) {
      // Disable the current input field
      this.ViewStockData[Index].readOnly = true;
      this.ViewStockData[Index].allowAdd = false;
      if (this.TransferQtyArr.length === 0) {
        if (parseFloat(this.ViewStockData[Index].TransferQty) > parseFloat(this.StockData[0].Stock)) {
          this.Error = 1
          this.ViewStockData[Index].TransferQty = ''
          this.ErrorMsg = ''
          this.ErrorMsg = 'You Cannot Enter More Than Stock'
          const error = document.getElementById('Error')
          error?.click()
          return
        } else {
          this.TransferQtyArr.push({
            TransferQty: this.ViewStockData[Index].TransferQty,
            RamatId: this.RawmaterialId,
            GRNId: this.ViewStockData[Index].GRNId,
            GrnRefNo: this.ViewStockData[Index].GRN_Ref_No,
            GRNDate: this.ViewStockData[Index].GRNDate,
            Uom: this.ViewStockData[Index].Uom,
            TransId: this.ViewStockData[Index].TransId,
            GRNNo: this.ViewStockData[Index].GRNNo
          })
          console.log(this.TransferQtyArr);

          this.transferqtydisable[Index] = true
          for (let i = 0; i < this.ViewStockData.length; i++) {
            this.ViewStockData[i].Add = 0
          }
        }
      } else {
        this.TransferTotal = this.TransferQtyArr.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.TransferQty), 0);
        this.TransferTotal = this.ViewStockData[Index].TransferQty + this.TransferTotal
        console.log(this.TransferTotal);
        if (this.TransferTotal > parseFloat(this.StockData[0].Stock)) {
          this.Error = 1
          this.ViewStockData[Index].TransferQty = ''
          this.ErrorMsg = ''
          this.ErrorMsg = 'You Cannot Enter More Than Stock'
          const error = document.getElementById('Error')
          error?.click()
          return
        } else {
          this.TransferQtyArr.push({
            TransferQty: this.ViewStockData[Index].TransferQty,
            RamatId: this.RawmaterialId,
            GRNId: this.ViewStockData[Index].GRNId,
            GrnRefNo: this.ViewStockData[Index].GRN_Ref_No,
            GRNDate: this.ViewStockData[Index].GRNDate,
            Uom: this.ViewStockData[Index].Uom,
            TransId: this.ViewStockData[Index].TransId,
            GRNNo: this.ViewStockData[Index].GRNNo
          })
          console.log(this.TransferQtyArr);
          this.transferqtydisable[Index] = true

          for (let i = 0; i < this.ViewStockData.length; i++) {
            this.ViewStockData[i].Add = 0
          }
        }
      }
    } else {
      this.ErrorMsg = ''
      this.ErrorMsg = 'Transfer Quantity Should be Greater Than Zero..Please Check...'
      const error = document.getElementById('Error')
      error?.click()
      return
    }
  }
  Remove(Index: number): void {

    this.transferqtydisable[Index] = false
    this.ViewStockData[Index].TransferQty = ''
    this.TransferQtyArr.splice(Index, 1)
    if (Index < this.ViewStockData.length && Index > 0) {
      this.ViewStockData[Index - 1].readOnly = false;
    }
  }



  savevaildation() {
    for (let i = 0; i < this.ViewStockData.length; i++) {
      if (this.ViewStockData[i].allowAdd === true) {
        this.ErrorMsg = ''
        this.ErrorMsg = 'Please Add Transfer Quantity...'
        const error = document.getElementById('Error')
        error?.click()
        return
      } else {
        const save = document.getElementById('savevaild') as HTMLInputElement
        save?.click()
      }
    }
  }
  storetostoreUpdateArr: any[] = new Array()
  StoretostoreDet: any[] = new Array()
  StoreToStoreSave: any[] = new Array()
  Msg: string = ''
  status: string = ''
  save() {
    this.getpath1()
    this.storetostoreUpdateArr = []
    this.StoretostoreDet = []
    for (let i = 0; i < this.TransferQtyArr.length; i++) {
      this.StoretostoreDet.push({
        Rawmatid: this.TransferQtyArr[i].RamatId,
        Qty: this.TransferQtyArr[i].TransferQty,
        Uom: this.TransferQtyArr[i].Uom,
        Mindate: this.date.transform(this.cuurendate, 'yyyy-MM-dd'),
        GRNo: this.TransferQtyArr[i].GRNNo,
        Empid: this.Empid,
        GRNId: this.TransferQtyArr[i].GRNId,
        Min_ref_no: this.storetostoreform.controls['Min_ref_no'].value,
        TransId: this.TransferQtyArr[i].TransId,
        ToStoreId: this.storetostoreform.controls['Towarehouse'].value
      })
    }

    this.storetostoreUpdateArr.push({
      DeptId: this.Deptid,
      Mindate: this.storetostoreform.controls['Trandate'].value,
      Min_ref_no: this.storetostoreform.controls['Min_ref_no'].value,
      LocationId: this.LoactionId,
      Empid: this.Empid,
      StoreToStoreDet: this.StoretostoreDet
    })
    console.log(this.storetostoreUpdateArr);
    this.service.save(this.storetostoreUpdateArr).subscribe({
      next: (res: any) => {
        this.StoreToStoreSave = res
        console.log(this.StoreToStoreSave, 'save');
        this.status = this.StoreToStoreSave[0].status
        this.Msg = this.StoreToStoreSave[0].Msg
        if (this.StoreToStoreSave[0].status === 'Y') {
          const save = document.getElementById('Save') as HTMLInputElement
          save?.click()
        } else {
          const save = document.getElementById('Save') as HTMLInputElement
          save?.click()
        }
      },
      error: (err) => {
        this.apiErrorMsg = err;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      },
    })
  }
  finalSave() {
    this.Viewbtn=false
    this.storetostoreform.reset()
  }
}
