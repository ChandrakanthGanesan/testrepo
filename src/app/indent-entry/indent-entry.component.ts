import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IndentEntryService } from '../service/indent-entry.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { data } from 'jquery';

@Component({
  selector: 'app-indent-entry',
  templateUrl: './indent-entry.component.html',
  styleUrls: ['./indent-entry.component.scss'],
})
export class IndentEntryComponent implements OnInit {
  indentForm!: FormGroup;
  StoreReqFrom!: FormGroup;
  currentDate = new Date();
  LoactionId: number = 0;
  Empid: number = 0;
  apiErrorMsg: String = '';
  srtype: number = 1;
  constructor(
    private date: DatePipe,
    private service: IndentEntryService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }
  @ViewChild('apierrorDialog') apierrorDialog!: ElementRef;
  @ViewChild('StoreRelease') StoreRelease!: ElementRef;
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('ViewinTab') ViewinTab!: ElementRef

  ngOnInit(): void {
    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LoactionId = data[data.length - 1];
    console.log(this.LoactionId);
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid;
    this.indentForm = this.fb.group({
      indentNo: new FormControl('', Validators.required),
      Date: new FormControl('', Validators.required),
      dept: new FormControl('', Validators.required),
      deptname: new FormControl(''),
      category: new FormControl('', Validators.required),
      categoryid: new FormControl(''),
      Approved: new FormControl('', Validators.required),
      Approvedid: new FormControl(''),
      EmpName: new FormControl('', Validators.required),
      EmpId: new FormControl(''),
      indenttype: new FormControl('', Validators.required),
      desc: new FormControl(''),
    });
    this.indentForm.controls['Date'].setValue(this.date.transform(this.currentDate, 'yyyy-MM-dd'));
    this.indentForm.controls['indenttype'].setValue('Regular');
    this.getpath();
    this.indentForm.controls['indenttype'].valueChanges.subscribe((res) => {
      if (res == 'Regular') {
        this.srtype = 1;
      } else if (res == 'Capex') {
        this.srtype = 2;
      } else {
        return;
      }
    });
    this.StoreReqFrom = this.fb.group({
      frmdate: new FormControl('', Validators.required),
      todate: new FormControl('', Validators.required),
      dept: new FormControl('', Validators.required),
      deptid: new FormControl(''),
      material: new FormControl('', Validators.required),
      Empname: new FormControl('', Validators.required),
    });
    this.StoreReqFrom.controls['frmdate'].setValue(
      this.date.transform(this.currentDate, 'yyyy-MM-dd')
    );
    this.StoreReqFrom.controls['todate'].setValue(
      this.date.transform(this.currentDate, 'yyyy-MM-dd')
    );
  }
  indentPath: string = '';
  getpath() {
    // this.LoactionId=324324234
    this.service.Indentpath(this.LoactionId).subscribe({
      next: (data: any) => {
        console.log(data, 'path');
        if (data.length > 0) {
          if (data[0].status === 'N') {
            this.apiErrorMsg = '';
            this.apiErrorMsg = data[0].Msg;
            this.apierrorDialog.nativeElement.click();
            return;
          }
          this.indentPath = data[0].prefix + data[0].prefixseperator + data[0].compshort + data[0].prefixseperator + data[0].yeardisplay + data[0].prefixseperator;
        }
      },
      error: (error: any) => {
        this.apiErrorMsg = '';
        this.apiErrorMsg = error;
        this.apierrorDialog.nativeElement.click();
        return;
      },
      complete: () => {
        this.service.IndentTrano(this.indentPath).subscribe({
          next: (res: any) => {
            console.log(res, 'pathTranno');
            if (res.length > 0) {
              if (res[0].status === 'N') {
                this.apiErrorMsg = '';
                this.apiErrorMsg = res[0].Msg;
                this.apierrorDialog.nativeElement.click();
                return;
              }
              this.indentForm.controls['indentNo'].setValue(
                this.indentPath + res[0].TranNo
              );
            }
          },
          error: (error: any) => {
            this.apiErrorMsg = '';
            this.apiErrorMsg = error;
            this.apierrorDialog.nativeElement.click();
          },
          complete: () => {
            this.getdept();
          },
        });
      },
    });
  }
  deptdata: any[] = new Array();
  getdept() {
    this.service.Dept(this.LoactionId).subscribe({
      next: (res: any) => {
        this.deptdata = res
        console.log(this.deptdata, 'dept');
        if (res.length > 0) {
          if (res[0].status == 'N') {
            this.apiErrorMsg = '';
            this.apiErrorMsg = res[0].Msg;
            this.apierrorDialog.nativeElement.click();
            return;
          }
        }
      },
      error: (error: any) => {
        this.apiErrorMsg = '';
        this.apiErrorMsg = error;
        this.apierrorDialog.nativeElement.click();
        return;
      },
    });
  }
  deptevent(e: any) {
    this.indentForm.controls['dept'].setValue(e)
    this.deptdata.filter(res => {
      if (parseInt(this.indentForm.controls['dept'].value) === parseInt(res.DeptId)) {
        let deptname = res.DeptName
        this.indentForm.controls['deptname'].setValue(deptname)
        console.log(this.indentForm.controls['deptname'].value);

      }
      this.indentForm.controls['category'].setValue('')
      this.indentForm.controls['Approved'].setValue('')
      this.indentForm.controls['EmpName'].setValue('')
    })
    if (parseInt(this.indentForm.controls['dept'].value) > 0) {
      this.getCategory();
      this.getRawmat();
    }
  }
  getCategory() {
    this.service.Category(this.Empid, this.LoactionId).subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          console.log(data, 'category');
          if (data[0].status == 'N') {
            this.apiErrorMsg = '';
            this.apiErrorMsg = data[0].Msg;
            this.apierrorDialog.nativeElement.click();
            return;
          }
          this.indentForm.controls['category'].setValue(data[0].Category);
          this.indentForm.controls['categoryid'].setValue(data[0].CatId);
        }
      },
      complete: () => {
        this.getApproved();
      },
    });
  }
  appr: any[] = new Array();
  getApproved() {
    this.service.Approvedby(this.LoactionId, this.indentForm.controls['dept'].value).subscribe({
      next: (res: any) => {
        this.appr = res;
        console.log(this.appr);
        if (res.length > 0) {
          console.log(res, 'approved');
          if (res[0].status == 'N') {
            this.apiErrorMsg = '';
            this.apiErrorMsg = res[0].Msg;
            this.apierrorDialog.nativeElement.click();
            return;
          }
          if (res.length === 1) {
            this.indentForm.controls['Approved'].setValue(res[0].ApprovedBy);
            this.indentForm.controls['Approvedid'].setValue(
              res[0].ApprovedById
            );
          }
        }
      },
      error: (err) => {
        this.apiErrorMsg = '';
        this.apiErrorMsg = err;
        this.apierrorDialog.nativeElement.click();
      },
      complete: () => {
        this.getEmp();
      },
    });
  }
  Empdet: any[] = new Array();
  getEmp() {
    this.service.Employye(this.LoactionId, this.indentForm.controls['categoryid'].value, this.indentForm.controls['dept'].value).subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.Empdet = res;
          if (res[0].status == 'N') {
            this.apiErrorMsg = '';
            this.apiErrorMsg = res[0].Msg;
            this.apierrorDialog.nativeElement.click();
            return;
          }
          if (res.length === 1) {
            this.indentForm.controls['EmpName'].setValue(res[0].EmpName);
            this.indentForm.controls['EmpId'].setValue(res[0].EmpId);
          }
        }
      },
      error: (err) => {
        this.apiErrorMsg = '';
        this.apiErrorMsg = err;
        this.apierrorDialog.nativeElement.click();
      },
      complete: () => { },
    });
  }
  ViewStoreReq: any;
  onSubmit() {
    this.ViewStoreReq = true;
    if (this.indentForm.invalid) {
      return;
    } else {
      this.StoreRelease.nativeElement.click();
      this.StoreReqFrom.controls['dept'].setValue(this.indentForm.controls['deptname'].value);
      this.StoreReqFrom.controls['deptid'].setValue(this.indentForm.controls['dept'].value);

    }
    // this.getRawmat()
    console.log(this.Rawmatid, 'Rawmatid');
  }
  searchFn: any;
  customSearchFn(term: string, item: any) {
    return item.rawmatname.toLowerCase().startsWith(term.toLowerCase());
  }
  Rawmatid: any;

  Rawmateriladata: any[] = new Array();
  getRawmat() {
    // this.spinner.show()
    this.service.Material(this.LoactionId, this.indentForm.controls['dept'].value).subscribe({
      next: (res: any) => {
        // this.spinner.hide()
        this.Rawmateriladata = res;
        console.log(this.Rawmateriladata, 'mat');

        if (res.length > 0) {
          if (res[0].status == 'N') {
            this.apiErrorMsg = '';
            this.apiErrorMsg = res.Msg;
            this.apierrorDialog.nativeElement.click();
          }
        }
      },
      error: (err) => {
        this.apiErrorMsg = '';
        this.apiErrorMsg = err;
        this.apierrorDialog.nativeElement.click();
      },
    });
  }
  materialevent(e: any) {
    if (this.Rawmatid !== null && this.Rawmatid !== undefined) {
      this.ViewStore();
    }
  }
  viewStoreData: any[] = new Array()
  ViewStore() {
    this.viewStoreData = []
    this.spinner.show()
    this.service.ViewStoreRelease(this.LoactionId, this.srtype, this.StoreReqFrom.controls['frmdate'].value, this.StoreReqFrom.controls['todate'].value,
      this.StoreReqFrom.controls['deptid'].value, this.Empid, this.Rawmatid).subscribe({
        next: (res: any) => {
          if (res.length > 0) {
            console.log(res[0].status);
            if (res[0].status === 'N') {
              this.apiErrorMsg = '';
              this.apiErrorMsg = res[0].Msg;
              this.apierrorDialog.nativeElement.click();
              return;
            }
            this.service.PoPendingQty(this.LoactionId, this.Rawmatid).subscribe({
              next: (data: any) => {
                this.spinner.hide()
                if (data.length > 0) {
                  if (data[0].status === 'N') {
                    this.apiErrorMsg = '';
                    this.apiErrorMsg = data[0].Msg;
                    this.apierrorDialog.nativeElement.click();
                    return;
                  }
                  this.viewStoreData = []
                  for (let i = 0; i < res.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                      let Iss_Qty = res[i].minqty + res[i].prqty
                      let Pen_Qty = res[i].srqty - res[i].minqty + res[i].prqty
                      if (res[i].priority === 1) {
                        this.priority = 'Low'
                      } else if (res[i].priority === 2) {
                        this.priority = 'Medium'
                      } else {
                        this.priority = 'High'
                      }
                      if (this.LoactionId === 1) {
                        this.minlevel = res[i].minlevel
                        this.maxlevel = res[i].maxlevel
                        this.reorderlevel=res[i].reorderlevel
                      }else if(this.LoactionId ===2){
                        this.minlevel = res[i].minlevel2
                        this.maxlevel = res[i].maxlevel2
                        this.reorderlevel=res[i].reorderlevel2
                      }else if(this.LoactionId ===3){
                        this.minlevel = res[i].minlevel3
                        this.maxlevel = res[i].maxlevel3
                        this.reorderlevel=res[i].reorderlevel3
                      }else{
                        this.minlevel = res[i].minlevel6
                        this.maxlevel = res[i].maxlevel6
                        this.reorderlevel=res[i].reorderlevel6
                      }
                      this.viewStoreData.push({
                        Sr_Ref_No: res[i].Sr_Ref_No,
                        SRDate: res[i].SRDate,
                        gStrMatDisp: res[i].gStrMatDisp,
                        srqty: res[i].srqty,
                        SRUom: res[i].SRUom,
                        Iss_Qty: Iss_Qty,
                        Pen_Qty: Pen_Qty,
                        rstock: res[i].rstock,
                        Pend_PO_Qty: data[j].bal,
                        min_level: this.minlevel,
                        max_level:  this.maxlevel,
                        reorder_level: this.reorderlevel,
                        priority: this.priority,
                        Desc: this.indentForm.controls['desc'].value,
                        Spec: this.Spec,
                        capexno: res[i].capexno
                      })


                      console.log(this.viewStoreData, 'viewStoreData');
                    }
                  }
                }
              }
            })
          } else {
            this.NoRecordsShow = false
            this.apiErrorMsg = 'No Records To Found';
            this.apierrorDialog.nativeElement.click();
            // this.NoRecordsShow = true
          }
        },
      });

  }
  minlevel: number = 0
  maxlevel:number=0
  reorderlevel: number = 0
  priority: string = ''
  Spec: string = ''
  QtyVaildashow: boolean = true
  NoRecordsShow: boolean = true
  QtyVaildation() {
    console.log(this.QtyVaildashow, '!');
    this.QtyVaildashow = false
    console.log(this.QtyVaildashow, '@');
    this.StoreRelease.nativeElement.click();
    console.log('aserfserfwerew');
    this.QtyVaildashow = true
  }
  Releasebtn: any;

  Currqty: number = 0
  MainTabelRelease: any[] = new Array()
  MaintabelShow: boolean = false
  Release() {
    this.viewStoreData.forEach((res: any) => {
      console.log(res.Currqty);
      if (res.Currqty == undefined || res.Currqty == '' || res.Currqty == 0) {
        this.QtyVaildashow = false
        this.apiErrorMsg = ''
        this.apiErrorMsg = 'Qty Required';
        this.apierrorDialog.nativeElement.click();
        this.QtyVaildashow = true
      } else {
        this.MainTabelRelease = []
        for (let i = 0; i < this.viewStoreData.length; i++) {
          if (this.viewStoreData[i].Currqty > this.viewStoreData[i].Pen_Qty) {
            this.QtyVaildashow = false
            this.apiErrorMsg = ''
            this.apiErrorMsg = 'Quantity cannot be greater than Pending quantity ' + '' + ',' + this.viewStoreData[i].Sr_Ref_No + '.For Pending Qty Is ' + '\n' + '' + this.viewStoreData[i].Pen_Qty + '.You Will Entered as ' + this.viewStoreData[i].Currqty + '';
            this.viewStoreData[i].Currqty = ''
            this.apierrorDialog.nativeElement.click();
            this.QtyVaildashow = true
            return
          } else {
            this.QtyVaildashow = true
            this.NoRecordsShow = true
            this.MainTabelRelease.push({
              gStrMatDisp: this.viewStoreData[i].gStrMatDisp,
              SRUom: this.viewStoreData[i].SRUom,
              Currqty: this.viewStoreData[i].Currqty,
              rstock: this.viewStoreData[i].rstock,
              min_level: this.viewStoreData[i].min_level,
              max_level: this.viewStoreData[i].max_level,
              reorder_level: this.viewStoreData[i].reorder_level,
              Spec: this.viewStoreData[i].Spec,
              Desc: this.viewStoreData[i].Desc,
              priority: this.viewStoreData[i].priority,
              capexno: this.viewStoreData[i].capexno
            })
          }
          console.log(this.MainTabelRelease, ' this.MainTabelRelease');
          this.MaintabelShow = true
          this.closeButton.nativeElement.click()
        }
      }
    })
  }
  apiError() {
    this.spinner.show();
  }
  tabView() {
    this.ViewinTab.nativeElement.click()
  }
}
