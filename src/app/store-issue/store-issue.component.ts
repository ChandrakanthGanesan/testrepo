import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StoreIssueService } from '../service/store-issue.service';
import { data, event } from 'jquery';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-store-issue',
  templateUrl: './store-issue.component.html',
  styleUrls: ['./store-issue.component.scss']
})
export class StoreIssueComponent implements OnInit {
  currentDate = new Date()
  currentDate1 = new Date()
  currentDate2 = new Date()
  Issuedate: any
  fromdt: any
  Todate: any
  StoreIssueForm!: FormGroup;
  LoactionId: number = 0
  Empid: number = 0

  displayedColumns: string[] = []
  constructor(private router: Router, private date: DatePipe, private toastr: ToastrService, private spinnerService: NgxSpinnerService, private formBuilder: FormBuilder, private service: StoreIssueService) { }
  ngOnInit(): void {
    this.Issuedate = this.date.transform(this.currentDate, 'yyyy-MM-dd');
    // this.fromdt = '2024-07-12'
    this.fromdt = this.date.transform(this.currentDate1, 'yyyy-MM-dd');
    this.Todate = this.date.transform(this.currentDate2, 'yyyy-MM-dd');
    console.log(this.Issuedate);

    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LoactionId = data[data.length - 1]
    console.log(this.LoactionId);
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    console.log(this.Empid);

    this.StoreIssueForm = this.formBuilder.group({
      IssueNo: new FormControl('', Validators.required),
      Department: new FormControl('', Validators.required),
      Refno: new FormControl('', Validators.required),
      material: new FormControl('', Validators.required),
      Warehouse: new FormControl('', Validators.required),
    })
    this.GetIssueNopath()

  }
  Datechange(e: any) {
    this.Issuedate = e.target.value
    console.log(this.Issuedate);
  }
  Frmdatevent(e: any) {
    this.fromdt = e.target.value
    console.log(this.fromdt);
    this.GetRefno()
  }
  TodateEvent(e: any) {
    this.Todate = e.target.value
    console.log(this.Todate);
    this.GetRefno()
  }
  IssueNopath: string = ''
  apiErrorMsg: string = ''
  GetIssueNopath() {
    //this.spinnerService.show()
    this.service.Issuenopath(this.LoactionId).subscribe({
      next: (data: any) => {
        //this.spinnerService.hide()
        const IssuenopathData = data
        console.log(IssuenopathData, 'IssuenopathData');
        if (IssuenopathData[0].status === 'N') {
          this.apiErrorMsg = IssuenopathData[0].Msg
          const Error = document.getElementById('apierror') as HTMLInputElement
          Error.click()
          return
        }
        if (IssuenopathData.length !== 0) {
          this.IssueNopath = IssuenopathData[0].Prefix + IssuenopathData[0].PrefixSeperator + 'U' + IssuenopathData[0].LocationId + IssuenopathData[0].PrefixSeperator + IssuenopathData[0].YearDisplay + IssuenopathData[0].PrefixSeperator
          console.log(this.IssueNopath, 'IssueNopath');
          this.GetIssue()
        } else {
          return;
        }
      },
      error: (error: any) => {
        this.apiErrorMsg = error;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  StoreIssuePath: string = ''
  GetIssue() {
    this.service.StoteissueNo(this.IssueNopath).subscribe({
      next: (data: any) => {
        const IssueNo = data
        console.log(IssueNo, 'IssueNo');
        if (IssueNo[0].status === 'N') {
          this.apiErrorMsg = IssueNo[0].Msg
          const Error = document.getElementById('apierror') as HTMLInputElement
          Error.click()
          return
        }
        if (IssueNo.length != 0) {
          const trno = this.IssueNopath + IssueNo[0].trno
          this.StoreIssuePath = this.IssueNopath + IssueNo[0].trno
          this.StoreIssueForm.controls['IssueNo'].setValue(trno)
          this.GetDepartment()
        } else {
          return;
        }
      },
      error: (error: any) => {
        this.apiErrorMsg = error;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  Depatment: any[] = new Array()
  GetDepartment() {
    this.service.Department(this.LoactionId).subscribe({
      next: (data: any) => {
        this.Depatment = data
        console.log(this.Depatment, 'Dept');
        if (this.Depatment[0].status === 'N') {
          this.apiErrorMsg = this.Depatment[0].Msg
          const Error = document.getElementById('apierror') as HTMLInputElement
          Error.click()
          return
        }
      },
      error: (error: any) => {
        this.apiErrorMsg = error;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })

  }
  Deptid: number = 0
  DeptEvent(event: any) {
    this.Deptid = event
    console.log(this.Deptid, 'Deptid');
    this.GetRefno()
    this.StoreIssueForm.controls['Refno'].setValue('')
    this.StoreIssueForm.controls['Warehouse'].setValue('')
    this.StoreIssueForm.controls['material'].setValue('')
    this.MaterilaDetalis = []
  }


  RefnoData: any[] = new Array()
  GetRefno() {
    this.service.Refno(this.LoactionId, this.Issuedate, this.fromdt, this.Todate, this.Deptid).subscribe({
      next: (data: any) => {
        this.RefnoData = data
        console.log(this.RefnoData, 'Refno');
        if (this.RefnoData[0].status === 'N') {
          this.apiErrorMsg = this.RefnoData[0].Msg
          const Error = document.getElementById('apierror') as HTMLInputElement
          Error.click()
          return
        }
      },
      error: (error: any) => {
        this.apiErrorMsg = error;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  RefSrno: string = ''
  srno: number = 0
  RefnoEvent(event: any) {
    this.srno = parseInt(event.target.value)
    console.log(this.srno, 'RefSrno');
    const ref = this.RefnoData.forEach((data: any) => {
      if (this.srno == data.SrNo) {
        this.RefSrno = data.Sr_Ref_No
      }
    })
    this.StoreIssueForm.controls['Warehouse'].setValue('')
    this.StoreIssueForm.controls['material'].setValue('')
    this.MaterilaDetalis = []
    this.viewbtn = false
    this.GetWarehouse()
  }
  warehousedata: any[] = new Array()
  GetWarehouse() {
    this.service.Warehouse(this.LoactionId).subscribe((data: any) => {
      this.warehousedata = data
      console.log(this.warehousedata, 'this.warehousedata');
      if (this.warehousedata[0].status === 'N') {
        this.apiErrorMsg = this.warehousedata[0].Msg
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }
  warehouseno: number = -0
  WarehouseEvent(event: any) {
    this.warehouseno = event.target.value
    console.log(this.warehouseno, 'WareHouseNumber');
    this.GetMaterial()
    this.StoreIssueForm.controls['material'].setValue('')
    this.MaterilaDetalis = []

  }
  Rawmateriladata: any[] = new Array()
  RawmaterialValid: any[] = new Array()
  GetMaterial() {
    this.service.Rawmaterial(this.LoactionId, this.Deptid, this.fromdt, this.Todate, this.RefSrno).subscribe({
      next: (data: any) => {
        this.Rawmateriladata = data
        if (this.Rawmateriladata[0].status === 'N') {
          this.apiErrorMsg = this.Rawmateriladata[0].Msg
          const Error = document.getElementById('apierror') as HTMLInputElement
          Error.click()
          return
        }
        console.log(this.Rawmateriladata, 'material');
        if (this.Rawmateriladata.length == 0) {
          this.toastr.warning('No Records To Found.Please Fill Correct Detalis');
          return
        } else {
          this.RawmaterialValid = []
          for (let i = 0; i < this.Rawmateriladata.length; i++) {
            this.MaterialAddbtn = false
            this.MaterilaDetalis = []
            this.RawmaterialValid.push({
              RawMatName: this.Rawmateriladata[i].RawMatName,
              RawMatID: this.Rawmateriladata[i].RawMatID
            })
          }
        }
      },
      error: (error: any) => {
        this.apiErrorMsg = error;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })
  }

  Rawmatid: any = 0
  RawMaterialName: string = ''
  getMaterialDetails(event: any) {
    this.Rawmatid = parseInt(event)
    const Rawmaterial = this.Rawmateriladata.forEach((data: any) => {
      if (this.Rawmatid === data.rawmatid) {
        this.RawMaterialName = data.rawmatname
      }
      console.log(this.RawMaterialName, 'MaterialName');
    })
  }
  get view(): { [key: string]: AbstractControl } {
    return this.StoreIssueForm.controls;
  }

  issueQtyvalue: any
  Issuevalue: number = 0
  issueQty(event: any) {
    //debugger
    this.issueQtyvalue = parseInt(event.target.value)
    this.Issuevalue = parseInt(event.target.value)

  }
  Releasebtndisable = [false, false]
  Isuuechck() {
    this.Issuevalue = 0
  }
  viewbtn: any
  MaterialRealase: any[] = new Array()
  PendingQty: number = 0
  cmpname: string = 'SFPL'
  deptname: string = ''
  Viewmat: boolean = false
  RawmaterialInd: any
  MaterilaDetalis: any[] = new Array()
  IndentDetalisData: any[] = new Array()
  StockAvl: number = 0
  StockMinimumcheck: any
  matlcolor: any
  NostockMaterial: any[] = new Array()
  Add() {
    this.viewbtn = true
    if (this.StoreIssueForm.invalid) {
      return
    } else {
      // debugger
      if (this.Rawmatid !== 0) {
        this.spinnerService.show()
        this.service.IssueMaterialViewbtn(this.LoactionId, this.Issuedate, this.warehouseno, this.Deptid, this.srno,
          this.Rawmatid, this.fromdt, this.Todate).subscribe({
            next: (data: any) => {
              this.spinnerService.hide()
              this.MaterialRealase = data
              if (this.MaterialRealase[0].status === 'N') {
                this.apiErrorMsg = this.MaterialRealase[0].Msg
                const Error = document.getElementById('apierror') as HTMLInputElement
                Error.click()
                return
              }
              this.Tab1 = 0
              if (this.MaterialRealase.length !== 0) {
                this.PendingQty = this.MaterialRealase[0].srqty - this.MaterialRealase[0].minqty
                this.deptname = this.MaterialRealase[0].deptname
                console.log(this.Rawmatid);
                this.spinnerService.show()
                this.service.IndentDet(this.LoactionId, this.Issuedate, this.Rawmatid, this.Deptid).subscribe((res: any) => {
                  this.spinnerService.hide()
                  this.IndentDetalisData = res
                  if (this.IndentDetalisData[0].status === 'N') {
                    this.apiErrorMsg = this.IndentDetalisData[0].Msg
                    const Error = document.getElementById('apierror') as HTMLInputElement
                    Error.click()
                    return
                  }
                  console.log(this.MaterialRealase, 'MaterialRequest To Realese');
                  console.log(this.IndentDetalisData, 'IndentDetalisData');
                  if (this.IndentDetalisData.length !== 0) {
                    this.StockAvl = this.IndentDetalisData[0].Store_Stk_Qty
                    if (this.IndentDetalisData[0].Store_Stk_Qty === 0) {
                      for (let i = 0; i < this.MaterialRealase.length; i++) {
                        this.NostockMaterial.push({
                          gStrMatDisp: this.MaterialRealase[i].gStrMatDisp,
                          RawMatID: this.MaterialRealase[i].RawMatID,
                        })
                        console.log(this.NostockMaterial, 'NOSTOCK ARRAY');
                      }
                      // this.Error = 5
                      this.ErrorMsg = ''
                      this.ErrorMsg = 'Stock Is Not Available For This Material...'
                      const stock = document.getElementById('Error') as HTMLInputElement
                      stock.click()
                      return
                    } else {
                      this.Viewmat = true
                      console.log(this.StockAvl);
                      for (let i = 0; i < this.MaterialRealase.length; i++) {
                        console.log(this.MaterialRealase[i].SRId, 'srid');
                        console.log(this.MaterialRealase[i].RawMatID, '22');
                        this.StockMinimumcheck = this.StockAvl < this.MaterialRealase[0].min_level
                        this.MaterilaDetalis.push({
                          Sr_Ref_No: this.MaterialRealase[i].Sr_Ref_No,
                          SRDate: this.MaterialRealase[i].SRDate,
                          gStrMatDisp: this.MaterialRealase[i].gStrMatDisp,
                          RawMatID: this.MaterialRealase[i].RawMatID,
                          SRId: this.MaterialRealase[i].SRId,
                          SRUom: this.MaterialRealase[i].SRUom,
                          srqty: this.MaterialRealase[i].srqty,
                          loc_id: this.MaterialRealase[i].loc_id,
                          Pendingqty: this.MaterialRealase[i].srqty - this.MaterialRealase[i].minqty,
                          stock: this.StockAvl,
                          min_level: this.MaterialRealase[i].min_level,
                          max_level: this.MaterialRealase[i].max_level,
                          reorder_level: this.MaterialRealase[i].reorder_level,
                          deptname: this.MaterialRealase[i].deptname,
                          popend: this.MaterialRealase[i].popend,
                          color: this.StockMinimumcheck
                        })
                        this.MaterialAddbtn = true
                        this.StoreIssueForm.disable()
                        console.log(this.RawmaterialValid.length === this.MaterilaDetalis.length);
                        this.Rawmateriladata.length === this.MaterilaDetalis.length
                        if (this.Rawmateriladata.length === this.MaterilaDetalis.length) {
                          this.viewbtn = false
                        } else {
                          this.viewbtn = true
                        }
                        console.log(this.MaterilaDetalis, 'this.MaterilaDetalis');
                      }
                      if (this.Rawmatid === parseInt(this.MaterialRealase[0].RawMatID)) {
                        const RawMaterialiD = [parseInt(this.MaterialRealase[0].RawMatID)]
                        this.RawmaterialValid = this.RawmaterialValid.filter(item => !RawMaterialiD.includes(item.RawMatID));
                        console.log(this.RawmaterialValid);
                        // this.Rawmatid=0
                        this.StoreIssueForm.controls['material'].setValue(this.RawmaterialValid)
                      }
                    }

                  }
                })
              }
              else {
                this.ErrorMsg = ''
                this.ErrorMsg = 'No Records To Found...'
                const view = document.getElementById('Error') as HTMLInputElement
                view.click()
                return;
              }
            },
            error: (error: any) => {
              this.apiErrorMsg = error;
              const Error = document.getElementById('apierror') as HTMLInputElement
              Error.click()
              return
            }
          })
      } else {
        // this.Error = 8
        this.ErrorMsg = ''
        this.ErrorMsg = 'Please Select Material...'
        const stock = document.getElementById('Error') as HTMLInputElement
        stock.click()
        return
      }
    }

  }
  Clear() {
    this.Viewmat = false
    this.viewbtn = false
    this.StoreIssueForm.controls['Department'].setValue('')
    this.StoreIssueForm.controls['Refno'].setValue('')
    this.StoreIssueForm.controls['material'].setValue('')
    this.StoreIssueForm.controls['Warehouse'].setValue('')
    this.StoreIssueForm.enable()
    this.MaterilaDetalis = []
    this.Issuedetalisarr = []
    this.BatchData = []
    this.Batcharr = []
    this.NostockMaterial = []
    this.RawmaterialValid = []
    this.Batchwise = []
    this.ReleaseAllMaterial = []
  }
  Tab1 = 0;
  tablabelname: string = '';
  tabChangedRegular(e: MatTabChangeEvent) {
    this.Tab1 = e.index;
    console.log(this.Tab1, 'tab');

    console.log(this.Tab1, 'Tab');
    this.tablabelname = e.tab.textLabel
    console.log(this.tablabelname);

  }
  // Error: number = 0
  issuedetalisIndex: number = 0

  ReleaseVaildation(Index: number) {
    debugger
    this.issuedetalisIndex = Index
    console.log(this.MaterilaDetalis[this.issuedetalisIndex].Issueqtymodal);

    if (this.MaterilaDetalis[Index].Issueqtymodal > (this.MaterilaDetalis[Index].Pendingqty)) {
      // this.Error = 1
      this.ErrorMsg = ''
      this.ErrorMsg = 'You cannot issue more than Requested qty...'
      const pending = document.getElementById('Error')
      pending?.click()
      return
    }

    else if (this.MaterilaDetalis[Index].Issueqtymodal > this.MaterilaDetalis[Index].stock) {
      // this.Error = 2
      this.ErrorMsg = ''
      this.ErrorMsg = 'You cannot Issue more than Availabel Stock...'
      const reqqty = document.getElementById('Error')
      reqqty?.click()
      return
    }
    else {
      if (this.MaterilaDetalis[Index].Issueqtymodal > this.MaterilaDetalis[Index].min_level) {

        this.ErrorMsg = ''
        this.ErrorMsg = 'Do You Want Release the Quantity? ' +
          'Minimum Level Qty Is Less than Issue Qty...'
        const minqty = document.getElementById('Error2')
        minqty?.click()
      } else {
        if (this.MaterilaDetalis[Index].Issueqtymodal > 0) {
          this.Release()
          this.ReleaseAllMaterial = []
          this.Releasebtndisable[Index] = true
        } else {
          // this.Error = 9
          this.ErrorMsg = ''
          this.ErrorMsg = 'Issue Qty Should Be Greater than Zero...'
          const issueqty = document.getElementById('Error')
          issueqty?.click()
          return
        }
      }
    }
  }
  Batchwise: any[] = new Array()
  ExpiryDate: any
  Issuedetalisarr: any[] = new Array()
  Sr_Ref_No: string = ''
  ind: any
  batchqty: number = 0
  BatchData: any[] = new Array()
  balqty: number = 0
  Batcharr: any[] = new Array()
  // Issueqtymodal: any
  ExpiryDateVailadCheck: any
  // valid: number = 0
  GrnQty: number = 0
  Release() {
    debugger
    if (this.MaterilaDetalis[this.issuedetalisIndex].Issueqtymodal > 0) {
      this.Tab1 = 1
      this.service.GmRefNo(this.warehouseno, this.Rawmatid, this.LoactionId).subscribe({
        next: (data: any) => {
          this.Batchwise = data
          if (this.Batchwise[0].status === 'N') {
            this.apiErrorMsg = this.Batchwise[0].Msg
            const Error = document.getElementById('apierror') as HTMLInputElement
            Error.click()
            return
          }
          console.log(this.Batchwise, 'Batchwise');
          if (this.warehouseno !== 32) {
            if (this.Batchwise.length > 0) {
              this.Releasebtndisable[this.issuedetalisIndex] = true
              debugger
              for (let j = 0; j < this.MaterilaDetalis.length; j++) {
                for (let i = 0; i < this.Batchwise.length; i++) {
                  if (this.Batchwise[i].stocknew > 0) {
                    if (this.issueQtyvalue > 0) {
                      if (this.issueQtyvalue <= this.Batchwise[i].stocknew) {
                        console.log(this.Batchwise[i].stocknew);
                        this.GrnQty = Math.round(this.Batchwise[i].stocknew)
                        this.Issuedetalisarr.push({
                          Sr_Ref_No: this.MaterilaDetalis[i].Sr_Ref_No,
                          SRDate: this.Batchwise[i].GrnDate,
                          Material: this.Batchwise[i].RawMatName,
                          MaterialID: this.Batchwise[i].Rawmatid,
                          UOM: this.Batchwise[i].PUom,
                          SrQty: this.PendingQty,
                          IssueQty: this.issueQtyvalue.toFixed(2),
                          GrnRefNo: this.Batchwise[i].Grn_Ref_no,
                          GrnQty: this.GrnQty.toFixed(2),
                          DeptName: this.deptname,
                          Grnid: this.Batchwise[i].GRNID,
                          GRnNO: this.Batchwise[i].GrnNo,
                          ExRate: this.Batchwise[i].ExRate,
                          StoreEntryId: this.Batchwise[i].StoreEntryId,
                          Srid: this.MaterilaDetalis[j].SRId,
                          Uom: this.MaterilaDetalis[j].SRUom
                        })
                        console.log(this.Issuedetalisarr, 'Issuedetalisarr-1');
                        this.service.Batch(parseInt(this.Batchwise[i].GRNID)).subscribe({
                          next: (data: any) => {
                            this.BatchData = data
                            if (this.BatchData[0].status === 'N') {
                              this.apiErrorMsg = this.BatchData[0].Msg
                              const Error = document.getElementById('apierror') as HTMLInputElement
                              Error.click()
                              return
                            }
                            console.log(this.BatchData, 'this.BatchData');
                            if (this.BatchData.length !== 0) {
                              for (let k = 0; k < this.BatchData.length; k++) {
                                this.balqty = this.BatchData[k].balqty
                                if (this.BatchData[k].balqty > 0) {
                                  this.Issuedetalisarr.forEach((res: any) => {
                                    if (this.BatchData[k].grnid === res.Grnid) {
                                      if (res.IssueQty <= this.BatchData[k].balqty) {
                                        this.issueQtyvalue = res.IssueQty
                                        console.log(this.issueQtyvalue, 'issueQtyvalue');
                                      } else {
                                        this.issueQtyvalue = res.IssueQty - this.BatchData[k].balqty
                                        console.log(this.issueQtyvalue, 'issueQtyvalue');
                                      }
                                    }
                                  })
                                  this.Batcharr.push({
                                    Grnno: this.Issuedetalisarr[i].GRnNO,
                                    GrnId: this.Issuedetalisarr[i].Grnid,
                                    GrnRefNo: this.BatchData[k].grn_ref_no,
                                    GrnDate: this.BatchData[k].grndate,
                                    Material: this.BatchData[k].rawmatname,
                                    MaterialID: this.BatchData[k].rawmatid,
                                    BatchNo: this.BatchData[k].batchno,
                                    ExpiryDate: this.BatchData[k].Batchdate,
                                    BatchQty: this.BatchData[k].batchqty,
                                    BalanceQty: this.BatchData[k].balqty.toFixed(2),
                                    BatchId: this.BatchData[k].batch_id,
                                    IssueQty: this.issueQtyvalue.toFixed(2)
                                  })
                                  console.log(this.Batcharr, 'Batcharr tabel-1');
                                  this.ExpiryDateVailadCheck = this.Batcharr[k].ExpiryDate < this.Issuedate
                                  if (this.ExpiryDateVailadCheck === true) {
                                    console.log('yes');
                                    this.ErrorMsg = ''
                                    this.ErrorMsg = 'Already Expired this material. Please get the revalidation certificate otherwise you cannot issue'
                                    const Batchdate = document.getElementById('Error') as HTMLInputElement
                                    Batchdate.click()
                                    return
                                  } else {
                                    this.issueQtyvalue = 0
                                  }
                                }
                              }
                            }
                          },
                          error: (error: any) => {
                            this.apiErrorMsg = error;
                            const Error = document.getElementById('apierror') as HTMLInputElement
                            Error.click()
                            return
                          }
                        })
                        this.issueQtyvalue = 0

                      } else {
                        if (this.Batchwise[i].stocknew < this.issueQtyvalue) {
                          this.issueQtyvalue = this.issueQtyvalue - this.Batchwise[i].stocknew
                          console.log(this.issueQtyvalue, 'issue', this.GrnQty, 'this.GrnQty');
                        }
                        else {
                          this.issueQtyvalue = this.issueQtyvalue
                        }
                        this.Issuedetalisarr.push({
                          Sr_Ref_No: this.MaterilaDetalis[i].Sr_Ref_No,
                          SRDate: this.Batchwise[i].GrnDate,
                          Material: this.Batchwise[i].RawMatName,
                          MaterialID: this.Batchwise[i].Rawmatid,
                          UOM: this.Batchwise[i].PUom,
                          SrQty: this.PendingQty,
                          IssueQty: this.Batchwise[i].stocknew.toFixed(2),
                          GrnRefNo: this.Batchwise[i].Grn_Ref_no,
                          GrnQty: this.Batchwise[i].stocknew.toFixed(2),
                          DeptName: this.deptname,
                          Grnid: this.Batchwise[i].GRNID,
                          GRnNO: this.Batchwise[i].GrnNo,
                          ExRate: this.Batchwise[i].ExRate,
                          StoreEntryId: this.Batchwise[i].StoreEntryId,
                          Srid: this.MaterilaDetalis[j].SRId,
                          Uom: this.MaterilaDetalis[j].SRUom
                        })

                        console.log(this.Issuedetalisarr, 'Issuedetalisarr-2');
                        this.service.Batch(parseInt(this.Batchwise[i].GRNID)).subscribe({
                          next: (data: any) => {
                            this.BatchData = data
                            if (this.BatchData[0].status === 'N') {
                              this.apiErrorMsg = this.BatchData[0].Msg
                              const Error = document.getElementById('apierror') as HTMLInputElement
                              Error.click()
                              return
                            }
                            console.log(this.BatchData, 'this.BatchData');
                            if (this.BatchData.length !== 0) {
                              for (let k = 0; k < this.BatchData.length; k++) {
                                this.balqty = this.BatchData[k].balqty
                                if (this.BatchData[k].balqty > 0) {
                                  debugger
                                  this.Issuedetalisarr.forEach((res: any) => {
                                    if (this.BatchData[k].grnid === res.Grnid) {
                                      if (res.IssueQty <= this.BatchData[k].balqty) {
                                        this.issueQtyvalue = res.IssueQty
                                        console.log(this.issueQtyvalue, 'issueQtyvalue');
                                      } else {
                                        this.issueQtyvalue = res.IssueQty - this.BatchData[k].balqty
                                        console.log(this.issueQtyvalue, 'issueQtyvalue');
                                      }
                                    }
                                  })
                                  this.Batcharr.push({
                                    Grnno: this.Issuedetalisarr[i].GRnNO,
                                    GrnId: this.Issuedetalisarr[i].Grnid,
                                    GrnRefNo: this.BatchData[k].grn_ref_no,
                                    GrnDate: this.BatchData[k].grndate,
                                    Material: this.BatchData[k].rawmatname,
                                    MaterialID: this.BatchData[k].rawmatid,
                                    BatchNo: this.BatchData[k].batchno,
                                    ExpiryDate: this.BatchData[k].Batchdate,
                                    BatchQty: this.BatchData[k].batchqty,
                                    BalanceQty: this.BatchData[k].balqty.toFixed(2),
                                    BatchId: this.BatchData[k].batch_id,
                                    IssueQty: this.issueQtyvalue.toFixed(2)
                                  })
                                  console.log(this.Batcharr, 'Batcharr tabel-4');
                                  this.ExpiryDateVailadCheck = this.Batcharr[k].ExpiryDate < this.Issuedate
                                  if (this.ExpiryDateVailadCheck === true) {
                                    this.ErrorMsg = ''
                                    this.ErrorMsg = 'Already Expired this material. Please get the revalidation certificate otherwise you cannot issue'
                                    const Batchdate = document.getElementById('Error') as HTMLInputElement
                                    Batchdate.click()
                                    return
                                  } else {
                                    this.issueQtyvalue = 0
                                  }
                                }
                              }
                            }
                          },
                          error: (error: any) => {
                            this.apiErrorMsg = error;
                            const Error = document.getElementById('apierror') as HTMLInputElement
                            Error.click()
                            return
                          }
                        })
                      }
                    }
                  }
                }
              }
              this.Rawmatid = 0
              this.MaterialAddbtn = false
              this.MaterialAllReleasebtn = true
              this.StoreIssueForm.controls['material'].enable()
              if (this.MaterilaDetalis.length !== 0) {
                this.savebtn = true
              }
            }
            else {
              this.Tab1 = 0
              this.ErrorMsg = ''
              this.ErrorMsg = 'No Records Found In BatchWise Please Contact Admin...'
              this.MaterialAddbtn = false
              this.StoreIssueForm.controls['material'].enable()
              const Error = document.getElementById('Error') as HTMLInputElement
              Error.click()
              return;
            }
          } else {

          }
        },
        error: (error: any) => {
          this.apiErrorMsg = error;
          const Error = document.getElementById('apierror') as HTMLInputElement
          Error.click()
          return
        }
      })
    } else {
      this.MaterialAllReleasebtn = true
      // this.Error = 9
      this.ErrorMsg = ''
      this.ErrorMsg = 'Issue Qty Should Be Greater than Zero...'
      const minqty = document.getElementById('Error') as HTMLInputElement
      minqty?.click()
      return
    }
    this.Issueqtymodaldisable[this.issuedetalisIndex] = true
    // this.MaterilaDetalis[this.issuedetalisIndex].Issueqtymodal = ''

  }
  ReleaseAllMaterial: any[] = new Array()
  MaterialAddbtn: boolean = true
  savebtn: boolean = false
  MaterialAllReleasebtn: boolean = true
  Issueqtymodaldisable = [false, false]
  empty() {
    if (this.MaterilaDetalis.length > 0) {
      this.MaterilaDetalis[this.issuedetalisIndex].Issueqtymodal = ''
    }
  }
  Deletemat(Index: number) {
    this.RawmaterialValid.push({
      RawMatName: this.MaterilaDetalis[Index].gStrMatDisp,
      RawMatID: this.MaterilaDetalis[Index].RawMatID,
    })
    console.log(this.RawmaterialValid);
    this.MaterilaDetalis.splice(Index, 1);
    this.Issuedetalisarr.splice(Index, 1);
    this.Batcharr.splice(Index, 1);
    this.StoreIssueForm.controls['material'].enable()
    this.Releasebtndisable[Index] = false
    this.MaterialAddbtn = false
    this.Issueqtymodaldisable[Index] = false
    if (this.Rawmateriladata.length === this.ReleaseAllMaterial.length) {
      this.MaterialAddbtn = true
      this.savebtn = true
    } else {
      this.savebtn = false
      this.MaterialAddbtn = false
    }
  }

  DeleteBatchwise(Index: number) {
    this.Tab1 = 0
    this.RawmaterialValid.push({
      RawMatName: this.MaterilaDetalis[Index].gStrMatDisp,
      RawMatID: this.MaterilaDetalis[Index].RawMatID,
    })
    console.log(this.RawmaterialValid);
    this.MaterilaDetalis.splice(Index, 1);
    this.Issuedetalisarr.splice(Index, 1);
    this.Batcharr.splice(Index, 1);
    this.Releasebtndisable[Index] = false
    this.Issueqtymodaldisable[Index] = false
    this.StoreIssueForm.controls['material'].enable()
    if (this.Rawmateriladata.length === this.ReleaseAllMaterial.length) {
      // this.MaterialAllReleasebtn = true
      this.MaterialAddbtn = true
      this.savebtn = true
    } else {
      // this.MaterialAllReleasebtn = false
      this.savebtn = false
      this.MaterialAddbtn = false
    }

  }

  MaterialReleaseClear() {
    this.MaterialRealase = []
    this.Batcharr = []
    this.Issuedetalisarr = []
  }
  ErrorMsg: string = ''
  releasebtn: any
  Savevaildation() {
    if (this.MaterilaDetalis[this.issuedetalisIndex].Issueqtymodal === '' || this.MaterilaDetalis[this.issuedetalisIndex].Issueqtymodal === 0) {
      this.ErrorMsg = ''
      this.ErrorMsg = 'Please Enter Issue Quantity'
      const savevaildation = document.getElementById('Error')
      savevaildation?.click()
      return
    } else {
      const savevaild = document.getElementById('savevaildation')
      savevaild?.click()
    }
    // }
  }
  SaveConfirm() {
    this.GetSave()
  }
  StoreIssueSave: any[] = new Array()
  UpdateStoreIssue: any[] = new Array()
  StoreIssue_Invent_MinMaterial: any[] = new Array()
  StoreIssue_invent_batchqtyissue: any[] = new Array()
  Sts: string = ''
  Msg: string = ''
  GetSave() {
    this.GetIssue()
    this.StoreIssue_invent_batchqtyissue = []
    this.StoreIssue_Invent_MinMaterial = []
    this.UpdateStoreIssue = []
    for (let i = 0; i < this.Issuedetalisarr.length; i++) {
      this.StoreIssue_Invent_MinMaterial.push({
        Rawmatid: this.Issuedetalisarr[i].MaterialID,
        IssueQty: this.Issuedetalisarr[i].IssueQty,
        Uom: this.MaterilaDetalis[this.issuedetalisIndex].SRUom,
        GrnNo: this.Issuedetalisarr[i].GRnNO,
        Empid: this.Empid,
        Grnid: this.Issuedetalisarr[i].Grnid,
        Min_ref_no: this.StoreIssuePath,
        Srid: this.MaterilaDetalis[this.issuedetalisIndex].SRId,
        StoreEntryId: this.Issuedetalisarr[i].StoreEntryId,
        InventRawmatid: this.Issuedetalisarr[i].MaterialID,
        InventProdid: this.Issuedetalisarr[i].MaterialID,
        InventGrnid: this.Issuedetalisarr[i].Grnid,
        InventMinQty: this.Issuedetalisarr[i].IssueQty,
        WarehouseLocationId: this.warehouseno,
        CurrencyId: 1,
        Exrate: this.Issuedetalisarr[i].ExRate,
        LocationId: this.LoactionId,
        StrIssRef_no: this.StoreIssuePath
      })
    }
    console.log(this.StoreIssue_Invent_MinMaterial, '1');
    if (this.Batcharr.length !== 0) {
      for (let i = 0; i < this.Batcharr.length; i++) {
        this.StoreIssue_invent_batchqtyissue.push({
          Grnno: this.Batcharr[i].Grnno,
          GrnId: this.Batcharr[i].GrnId,
          GrnRefNo: this.Batcharr[i].GrnRefNo,
          MaterialID: this.Batcharr[i].MaterialID,
          BatchNo: this.Batcharr[i].BatchNo,
          ExpiryDate: this.Batcharr[i].ExpiryDate,
          BatchId: this.Batcharr[i].BatchId,
          IssueQty: this.Batcharr[i].IssueQty
        })
        console.log(this.StoreIssue_invent_batchqtyissue, '2');
      }
    }
    if (this.Batcharr.length !== 0) {
      this.UpdateStoreIssue.push({
        Deptid: this.Deptid,
        StrIssRef_no: this.StoreIssuePath,
        LocationId: this.LoactionId,
        Empid: this.Empid,
        IssueId: this.Empid,
        ComputerName: 'Tab Entry',
        StoreIssue_Invent_MinMaterial: this.StoreIssue_Invent_MinMaterial,
        StoreIssue_invent_batchqtyissue: this.StoreIssue_invent_batchqtyissue
      })
      console.log(this.UpdateStoreIssue, 'saveData');
    } else {
      this.UpdateStoreIssue.push({
        Deptid: this.Deptid,
        StrIssRef_no: this.StoreIssuePath,
        LocationId: this.LoactionId,
        Empid: this.Empid,
        IssueId: this.Empid,
        ComputerName: 'Tab Entry',
        StoreIssue_Invent_MinMaterial: this.StoreIssue_Invent_MinMaterial,
        StoreIssue_invent_batchqtyissue: []
      })
      console.log(this.UpdateStoreIssue, 'saveData');
    }
    this.spinnerService.show()
    this.service.Save(this.UpdateStoreIssue).subscribe({
      next: (data: any) => {
        this.spinnerService.hide()
        this.StoreIssueSave = data
        console.log(this.StoreIssueSave, 'Save');
        this.Sts = this.StoreIssueSave[0].status
        this.Msg = this.StoreIssueSave[0].Msg
        if (this.Sts === 'Y') {
          const Save = document.getElementById('Save') as HTMLInputElement
          Save.click()
        } else {
          const Save = document.getElementById('Save') as HTMLInputElement
          Save.click()
        }
      },
      error: (error: any) => {
        this.apiErrorMsg = error;
        const Error = document.getElementById('apierror') as HTMLInputElement
        Error.click()
        return
      }
    })

  }
  finalSave() {
    this.UpdateStoreIssue = []
    this.StoreIssue_invent_batchqtyissue = []
    this.StoreIssue_Invent_MinMaterial = []
    this.viewbtn = false
    this.StoreIssueForm.reset()
    this.MaterialRealase = []
    this.Batchwise = []
    this.Issuedetalisarr = []
    this.Batcharr = []
    this.BatchData = []
    this.StoreIssueForm.enable()
    this.Viewmat = false
    this.MaterialAddbtn = true
    this.savebtn = false
    this.MaterilaDetalis = []
  }
  ViewMaterilaDetalis: any[] = new Array()
  View(Index: number) {
    const MaterailTabView = document.getElementById('MaterailTabView') as HTMLInputElement
    MaterailTabView.click()
    this.ViewMaterilaDetalis = []
    this.ViewMaterilaDetalis.push({
      MaterialName: this.MaterilaDetalis[Index].gStrMatDisp,
      SRUom: this.MaterilaDetalis[Index].SRUom,
      loc_id: this.MaterilaDetalis[Index].loc_id,
      max_level: this.MaterilaDetalis[Index].max_level,
      reorder_level: this.MaterilaDetalis[Index].reorder_level,
      deptname: this.MaterilaDetalis[Index].deptname,
      popend: this.MaterilaDetalis[Index].popend,
    })
    console.log(this.ViewMaterilaDetalis, 'view');
  }
  Spinnercall() {
    this.spinnerService.show()
  }
}
