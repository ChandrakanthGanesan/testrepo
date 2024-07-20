import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StorageQtyAllocationService } from '../service/storage-qty-allocation.service';
import { SelectionModel } from '@angular/cdk/collections';
import { data } from 'jquery';

@Component({
  selector: 'app-storage-qty-allocation',
  templateUrl: './storage-qty-allocation.component.html',
  styleUrls: ['./storage-qty-allocation.component.scss']
})
export class StorageQtyAllocationComponent implements OnInit {
  StockAllocForm!: FormGroup;
  currentDate = new Date()
  currentDate1 = new Date()
  LoactionId: number = 0
  Empid: number = 0
  Pending: string = ''

  constructor(private router: Router, private date: DatePipe, private toastr: ToastrService,
    private spinnerService: NgxSpinnerService, private formBuilder: FormBuilder, private service: StorageQtyAllocationService) { }
  ngOnInit() {
    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LoactionId = data[data.length - 1]
    console.log(this.LoactionId);
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    console.log(this.Empid);
    this.StockAllocForm = this.formBuilder.group({
      frmdate: new FormControl(''),
      Todate: new FormControl(''),
      Item: new FormControl('', Validators.required),
      PendingCheckBox: new FormControl('')
    })
    // this.StockAllocForm.controls['frmdate'].setValue(this.date.transform(this.currentDate, 'yyyy-MM-dd'))
    this.StockAllocForm.controls['frmdate'].setValue('2024-01-05')
    this.StockAllocForm.controls['Todate'].setValue(this.date.transform(this.currentDate1, 'yyyy-MM-dd'))
    this.StockAllocForm.controls['PendingCheckBox'].valueChanges.subscribe(value => {
      if (value === true) {
        this.Pending = 'Y'
      }
      else {
        this.Pending = 'N'
      }
    })
  }
  searchFn: any;
  customSearchFn(term: string, item: any) {
    return item.rawmatname.toLowerCase().startsWith(term.toLowerCase())
  }
  Rawmatid: number = 0
  RawmatnamePar: any

  Rawmat(event: any) {
    this.RawmatnamePar = event.target.value
    console.log(this.RawmatnamePar);
    if (this.RawmatnamePar.length >= 2) {
      if (this.RawmatnamePar !== null && this.RawmatnamePar !== undefined && this.RawmatnamePar !== 0) {
        this.getItems()
      } else {
        return;
      }
    } else if (this.RawmatnamePar.length < 2) {
      this.itemsData = []
    }

  }
  itemsData: any[] = new Array()
  getItems() {
    this.service.Items().subscribe((data: any) => {
      this.itemsData = data
      console.log(this.itemsData);

    })
  }
  materialname: string = ''
  getMaterialDetails() {
    console.log(this.Rawmatid, 'Rawmatid');
    const rawmatname = this.itemsData.filter((res: any) => {
      if (this.Rawmatid === res.rawmatid) {
        this.materialname = res.rawmatname
        console.log(this.materialname, 'material');
      }
    })

  }
  get View(): { [key: string]: AbstractControl } {
    return this.StockAllocForm.controls;
  }
  Viewbtn: any
  viewStock: any[] = new Array()
  warehouse: any
  warehouseData: any[] = new Array()
  StoragelocidZero: any[] = new Array()
  checked: any
  WarehouseArr: any[] = new Array()
  getViewbtn() {
    this.Viewbtn = false
    if (this.StockAllocForm.invalid) {
      return
    } else {
      if (this.Pending === '') {
        this.Pending = 'N'
      }
      this.service.View(this.LoactionId, this.StockAllocForm.controls['Item'].value, this.StockAllocForm.controls['frmdate'].value,
        this.StockAllocForm.controls['Todate'].value, this.Pending).subscribe((data: any) => {
          this.viewStock = data
          console.log(this.viewStock);
          if (this.viewStock.length === 0) {
            this.toastr.warning('No Records To Found')
          }
          else {
            for (let i = 0; i < this.viewStock.length; i++) {
              debugger
              // this.viewStock[i].Storagelocid=10
              if (this.viewStock[i].Storagelocid > 0) {
                this.warehouse[i] = true
              }
              if (this.viewStock[i].Storagelocid === 0) {
                this.service.Warehouse(this.LoactionId).subscribe((data: any) => {
                  this.StoragelocidZero = data
                  console.log(this.StoragelocidZero)
                  if (this.StoragelocidZero.length > 0) {
                    for (let j = 0; j < this.StoragelocidZero.length; j++) {
                      this.warehouseData.push({
                        WarehouseId: this.StoragelocidZero[j].Location_Id,
                        WarehouseName: this.StoragelocidZero[j].LocationName
                      })
                    }
                    console.log(this.warehouseData, 'dsf');
                  }
                  if (this.StoragelocidZero.length > 0 && this.viewStock[i].Storagelocid === 0) {
                    this.service.Warhouse1().subscribe((data: any) => {
                      const warehouse1 = data
                      if (warehouse1.length > 0) {
                        for (let k = 0; k < warehouse1.length; k++) {
                          if (this.LoactionId === 1 && (this.Rawmatid === warehouse1[k].rmsplitid)) {
                            this.warehouseData.push({
                              WarehouseId: warehouse1[k].Location_Id,
                              WarehouseName: warehouse1[k].LocationName
                            })
                            this.warehouse = false
                          }
                          if (this.LoactionId === 2 && (this.Rawmatid === warehouse1[k].rmsplitid)) {
                            this.warehouseData.push({
                              WarehouseId: warehouse1[k].Location_Id,
                              WarehouseName: warehouse1[k].LocationName
                            })
                            this.warehouse = false
                          }
                        }
                        console.log(this.warehouseData, '143');
                        this.WarehouseArr = this.warehouseData.reduce((acc, current) => {
                          const x = acc.find((item: any) => item.WarehouseId === current.WarehouseId);
                          if (!x) {
                            return acc.concat([current]);
                          } else {
                            return acc;
                          }

                        }, []);
                        console.log(this.WarehouseArr);
                      }
                    })
                  }
                })
              }
            }

          }
          if (this.viewStock[0].status === 'N') {
            this.toastr.error(this.viewStock[0].Msg)
            return
          }
        })
    }
  }
  WarehoouseId: number = 0
  WarehouseEvent(e: any) {
    this.WarehoouseId = e.target.value
    console.log(this.WarehoouseId);

  }
  Error: number = 0
  UpdateIndex: number = 0
  updatvalidation(Index: number) {
    this.UpdateIndex = Index
    // console.log(this.WarehouseArr[Index].WarehouseId);
    // this.WarehouseArr[Index].WarehouseId =0
    if (this.viewStock[Index].WarehouseId === 0) {
      this.Error = 1
      const WarehouseError = document.getElementById('Error') as HTMLInputElement
      WarehouseError.click()
      return
    }
    else {
      // this.update()
      console.log('s');
      const WarehouseError1 = document.getElementById('Savemenu') as HTMLInputElement
      WarehouseError1.click()
    }
  }
  UpdateStock: any[] = new Array()
  StockAllocationUpdate: any[] = new Array()
  update() {
    this.UpdateStock = []
    this.UpdateStock.push({
      Warehouseid: this.WarehouseArr[this.UpdateIndex].WarehouseId,
      GrnId: this.viewStock[this.UpdateIndex].Grnid,
      Quantity: this.viewStock[this.UpdateIndex].Quantity,
      Stock: this.viewStock[this.UpdateIndex].Quantity,
      TempStoreEntry_Id: this.viewStock[this.UpdateIndex].Storagelocid,
      GrnDate: this.viewStock[this.UpdateIndex].Grndate,
      Rawmatid: this.viewStock[this.UpdateIndex].Rawmatid,
      Prodid: this.viewStock[this.UpdateIndex].Rawmatid,
      LocationQty: this.viewStock[this.UpdateIndex].Quantity,
      LocationId: this.LoactionId,
      SupId: this.viewStock[this.UpdateIndex].Supid,
      Refno: this.viewStock[this.UpdateIndex].Grn_Ref_no,
      RunningWtAvgRate: this.viewStock[this.UpdateIndex].Quantity,
    })
    console.log(this.UpdateStock);
    this.service.Save(this.UpdateStock).subscribe((data: any) => {
      this.StockAllocationUpdate = data
      console.log(this.StockAllocationUpdate, 'SAVE DATA');
      this.Message = this.StockAllocationUpdate[0].Msg
      this.Sts = this.StockAllocationUpdate[0].status
      if (this.Sts === 'Y') {
        this.viewbtn()
        const Save = document.getElementById('Save') as HTMLInputElement
        Save.click()
      } else {
        const Save = document.getElementById('Save') as HTMLInputElement
        Save.click()
      }
    })

  }
  viewbtn() {
    this.service.View(this.LoactionId, this.StockAllocForm.controls['Item'].value, this.StockAllocForm.controls['frmdate'].value,
      this.StockAllocForm.controls['Todate'].value, this.Pending).subscribe((data: any) => {
        this.viewStock = data
      })
  }
  Message: string = ''
  Sts: string = ''
  clear() {
    this.StockAllocForm.controls['Item'].setValue('')
    this.StockAllocForm.controls['PendingCheckBox'].setValue('')
    this.itemsData = []
    this.viewStock = []
    this.UpdateStock = []
    this.warehouseData = []
    this.StockAllocationUpdate = []
  }
  finalSave() {
    this.StockAllocForm.controls['Item'].setValue('')
    this.StockAllocForm.controls['PendingCheckBox'].setValue('')
    this.itemsData = []
    this.viewStock = []
    this.UpdateStock = []
    this.warehouseData = []
    this.StockAllocationUpdate = []
  }
}
