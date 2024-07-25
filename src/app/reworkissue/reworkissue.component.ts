import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReworkissueService } from '../service/reworkissue.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { data, event } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reworkissue',
  templateUrl: './reworkissue.component.html',
  styleUrls: ['./reworkissue.component.scss']
})
export class ReworkissueComponent implements OnInit {
  currentDate = new Date()
  currentDate1 = new Date()
  currentDate2 = new Date()
  Issuedate: any
  fromdt: any
  Todate: any
  ReworkIssueForm!: FormGroup;
  LoactionId: number = 0
  Empid: number = 0
  @ViewChild('invalidfocus')invalidfocus!:ElementRef
  constructor(private router: Router, private date: DatePipe, private toastr: ToastrService,private spinnerService: NgxSpinnerService, private formBuilder: FormBuilder, private service: ReworkissueService) { }
  ngOnInit(): void {
    this.Issuedate = this.date.transform(this.currentDate, 'yyyy-MM-dd');
    this.fromdt = this.date.transform(this.currentDate1, 'yyyy-MM-dd');
    this.Todate = this.date.transform(this.currentDate2, 'yyyy-MM-dd');

    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LoactionId = data[data.length - 1]
    console.log(this.LoactionId);
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    console.log(this.Empid);
    this.ReworkIssueForm = this.formBuilder.group({
      IssueNo: new FormControl('', Validators.required),
      Department: new FormControl('', Validators.required),
      Refno: new FormControl('', Validators.required),
      material: new FormControl('', Validators.required),
      Warehouse: new FormControl('', Validators.required),
    })
    this.getIssuepath()
  }
  Issuepath: string = ''
  getIssuepath() {
    this.service.Issuepath(this.LoactionId, this.Issuedate).subscribe((data: any) => {
      const path = data
      console.log(path);
      this.Issuepath = path[0].Prefix + path[0].PrefixSeperator + 'U' + path[0].LocationId + path[0].PrefixSeperator + path[0].YearDisplay + path[0].PrefixSeperator
      console.log(this.Issuepath, 'path');
      this.getIssueNo()
    })
  }
  IssueNo: string = ''
  getIssueNo() {
    this.service.Issueno(this.Issuepath).subscribe((Data: any) => {
      const IssueNo = Data
      console.log(IssueNo);
      if (IssueNo.length > 0) {
        this.IssueNo = this.Issuepath + IssueNo[0].trno
        console.log(this.IssueNo, 'issueno');
        this.ReworkIssueForm.controls['IssueNo'].setValue(this.IssueNo)
        this.getDept()
      }
    })
  }
  Deptdata: any[] = new Array()
  getDept() {
    this.service.Dept(this.LoactionId).subscribe((data: any) => {
      this.Deptdata = data
    })
  }

  DeptEvent() {
    this.ReworkIssueForm.controls['Department'].value
    this.getRefno()
  }
  Frmdatevent(event: any) {
    this.currentDate2 = event.target.value
    this.getRefno()
  }
  TodateEvent(event: any) {
    this.currentDate1 = event.target.value
    this.getRefno()
  }
  RefnoData: any[] = new Array()
  getRefno() {
    this.service.RefNo(this.LoactionId, this.Issuedate, parseInt(this.ReworkIssueForm.controls['Department'].value), this.fromdt, this.Todate).subscribe
      ((data: any) => {
        this.RefnoData = data
        console.log(this.RefnoData);
      })
  }
  REFNo: string = ''
  RefnoEvent() {
    this.ReworkIssueForm.controls['Refno'].value
    const refno = this.RefnoData.forEach((res: any) => {
      if (res.SrNo === parseInt(this.ReworkIssueForm.controls['Refno'].value)) {
        this.REFNo = res.Sr_Ref_No
      }
    })
    this.getWarehouse()
  }
  warehouseData: any[] = new Array()
  getWarehouse() {
    this.service.Warehouse(this.LoactionId).subscribe((data: any) => {
      this.warehouseData = data
      console.log(this.warehouseData, 'warehouse');
    })
  }
  WarehouseEvent() {
    this.ReworkIssueForm.controls['Warehouse'].value

    this.getMaterial()
  }
  Materialdata: any[] = new Array()
  getMaterial() {
    this.service.Material(this.LoactionId, parseInt(this.ReworkIssueForm.controls['Department'].value), this.fromdt, this.Todate, this.REFNo)
      .subscribe((data: any) => {
        this.Materialdata = data
      })
  }
  getMaterialDetails() {
    this.ReworkIssueForm.controls['material'].value
  }
  get view(): { [key: string]: AbstractControl } {
    return this.ReworkIssueForm.controls;
  }
  viewbtn: any
  Tab1 = 0;
  MaterialRealase: any = new Array()
  PendingQty: any = 0
  ViewMaterial:boolean=false
  View() {
    this.viewbtn = true
    if (this.ReworkIssueForm.invalid) {
      this.invalidfocus.nativeElement.focus();
      return
    } else {
      this.service.View(this.LoactionId, this.Issuedate, parseInt(this.ReworkIssueForm.controls['Department'].value), parseInt(this.ReworkIssueForm.controls['Refno'].value), this.ReworkIssueForm.controls['material'].value, this.fromdt, this.Todate).subscribe((data: any) => {
        this.MaterialRealase = data
        this.Releasebtn=false
        console.log(this.MaterialRealase, 'ft');
        if (this.MaterialRealase.length !== 0) {
          this.ViewMaterial=true
          this.PendingQty = (this.MaterialRealase[0].srqty - this.MaterialRealase[0].minqty).toFixed(3)
          if (this.MaterialRealase[0].stock < this.MaterialRealase[0].min_level) {
            const minlevel = document.getElementById('Avlstock') as HTMLInputElement
            minlevel.style.backgroundColor = 'Red'
            minlevel.style.color = 'Black'
          }
        }
      })
    }
  }
  tablabelname: string = '';
  tabChangedRegular(e: MatTabChangeEvent) {
    this.Tab1 = e.index;
    console.log(this.Tab1, 'tab');

    console.log(this.Tab1, 'Tab');
    this.tablabelname = e.tab.textLabel
    console.log(this.tablabelname);

  }
  issueQty(event: any) {

  }
  dblqty: number = 0
  Stock_grindData: any[] = new Array()
  SubconInwardQtyUpdate: any[] = new Array()
  issedetalisRecord: any[] = new Array()
  IssueDetalisArray: any[] = new Array()
  Refno: string = ''
  material: string = ''
  uom: string = ''
  srqty: any = 0
  SrDate: any
  deptname: string = ''
  Releasebtn:boolean=false
  Release(Index: number) {
    this.Tab1 = 1
    this.Releasebtn=true
    for (let i = 0; i < this.MaterialRealase.length; i++) {
      this.service.Stock_grnid(parseInt(this.ReworkIssueForm.controls['Warehouse'].value), parseInt(this.ReworkIssueForm.controls['material'].value)).subscribe((data: any) => {
        this.Stock_grindData = data

        if (this.Stock_grindData.length !== 0) {
          this.Refno = this.MaterialRealase[0].Sr_Ref_No
          this.SrDate = this.MaterialRealase[0].SRDate
          this.material = this.MaterialRealase[0].gStrMatDisp
          this.uom = this.MaterialRealase[0].SRUom
          this.srqty = this.MaterialRealase[0].srqty
          this.deptname = this.MaterialRealase[0].deptname
          console.log(this.Refno);

        }
      })
    }

    for (let i = 0; i < this.MaterialRealase.length; i++) {
      if (this.MaterialRealase[i].stock > 0) {
        this.dblqty = this.MaterialRealase[i].stock
        this.spinnerService.show()
        this.service.issuedetalis(parseInt(this.ReworkIssueForm.controls['Warehouse'].value), parseInt(this.ReworkIssueForm.controls['material'].value), this.LoactionId).subscribe((data: any) => {
          this.issedetalisRecord = data
          this.spinnerService.hide()
          console.log(this.issedetalisRecord, 'issedetalisRecord');
          if (parseInt(this.ReworkIssueForm.controls['Warehouse'].value) !== 32) {
            for (let i = 0; i < this.issedetalisRecord.length; i++) {
              if (this.dblqty > 0) {
                const stock = this.issedetalisRecord[i].Stock
                if (this.dblqty <= parseInt(stock)) {
                  this.IssueDetalisArray.push({
                    Refno: this.Refno,
                    Date: this.SrDate,
                    Material: this.material,
                    Uom: this.uom,
                    SRQty: this.PendingQty,
                    GrnRefno: this.issedetalisRecord[i].Grn_Ref_no,
                    GrnQty: this.issedetalisRecord[i].Gqty,
                    Department: this.deptname
                  })
                  console.log(this.IssueDetalisArray);

                  this.dblqty = 0
                } else {
                  if (this.issedetalisRecord[i].Stock < this.dblqty) {
                    this.dblqty = this.dblqty - this.issedetalisRecord[i].Stock
                    this.IssueDetalisArray.push({
                      Refno: this.Refno,
                      Date: this.SrDate,
                      Material: this.material,
                      Uom: this.uom,
                      SRQty: this.PendingQty,
                      Stock: this.issedetalisRecord[i].Stock,
                      GrnRefno: this.issedetalisRecord[i].Grn_Ref_no,
                      GrnQty: this.issedetalisRecord[i].Gqty,
                      Department: this.deptname
                    })
                    console.log(this.IssueDetalisArray);
                  } else {
                    this.IssueDetalisArray.push({
                      Refno: this.Refno,
                      Date: this.SrDate,
                      Material: this.material,
                      Uom: this.uom,
                      SRQty: this.PendingQty,
                      Stock: this.issedetalisRecord[i].Stock,
                      GrnRefno: this.issedetalisRecord[i].Grn_Ref_no,
                      GrnQty: this.issedetalisRecord[i].Gqty,
                      Department: this.deptname
                    })
                    console.log(this.IssueDetalisArray);
                  }
                }
              }
            }
          }
          if (parseInt(this.ReworkIssueForm.controls['Warehouse'].value) === 32) {
            if (this.issedetalisRecord[i].Stock > 0) {
              this.IssueDetalisArray.push({
                Refno: this.Refno,
                Date: this.SrDate,
                Material: this.material,
                Uom: this.uom,
                SRQty: this.PendingQty,
                GrnRefno: this.issedetalisRecord[i].Grn_Ref_no,
                GrnQty: this.issedetalisRecord[i].Gqty,
                Department: this.deptname
              })
              console.log(this.IssueDetalisArray);
              this.dblqty = 0
            }
          }
        })
      }
    }
  }
}
