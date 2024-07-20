import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatlRecivedfrmdeptService } from '../service/matl-recivedfrmdept.service';
import { data, event } from 'jquery';

@Component({
  selector: 'app-material-return-frm-dept',
  templateUrl: './material-return-frm-dept.component.html',
  styleUrls: ['./material-return-frm-dept.component.scss']
})
export class MaterialReturnFrmDeptComponent implements OnInit {
  Currdate: any
  currentDate = new Date()
  LoactionId: number = 0
  Empid: number = 0

  constructor(private router: Router, private date: DatePipe, private toastr: ToastrService, private formBuilder: FormBuilder, private service: MatlRecivedfrmdeptService) { }
  ngOnInit(): void {
    this.Currdate = this.date.transform(this.currentDate, 'yyyy-MM-dd');
    console.log(this.Currdate);

    const data = JSON.parse(sessionStorage.getItem('location') || '{}');
    this.LoactionId = data[data.length - 1]
    console.log(this.LoactionId);
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    console.log(this.Empid);
    this.GetTranNopath()
  }
  path: string = ''
  GetTranNopath() {
    this.service.Trannopath(this.LoactionId, this.Currdate).subscribe((data: any) => {
      const path = data
      console.log(path, 'path');
      if (path.length > 0) {
        this.path = path[0].Prefix + path[0].PrefixSeperator + 'U' + path[0].LocationId + path[0].PrefixSeperator + path[0].YearDisplay + path[0].PrefixSeperator
        console.log(this.path);
        this.GetTranNo()
      } else {
        this.toastr.error('No Path Found..Please Contact Adminstrator')
        return
      }
    })
  }
  GetTranNo() {
    this.service.TranNo(this.path).subscribe((data: any) => {
      const tran = data
      console.log(tran);
      if (tran.length > 0) {
        this.path = this.path + tran[0].trno
        this.GetDept()
      } else {
        this.toastr.error('No Path Found..Please Contact Adminstrator')
        return
      }
    })
  }
  Deptdata: any[] = new Array()
  GetDept() {
    this.service.Department(this.LoactionId).subscribe((data: any) => {
      this.Deptdata = data
      if (this.Deptdata.length === 0) {
        this.toastr.error('No Department Found..Please Contact Adminstrator')
        return
      }
    })
  }
  DeptId: number = 0
  deptEvent(event: any) {
    this.DeptId = event
    console.log(this.DeptId);
  }
  Rawmat(event: any) {
    this.RawMatName = event.target.value
    if (this.RawMatName.length >= 1) {
      if (this.RawMatName !== null && this.RawMatName !== undefined && this.RawMatName !== 0) {

        this.getmaterial()
      } else {
        return;
      }
    } else if (this.RawMatName.length < 1) {

      this.materialdata = []
    }
  }

  materialdata: any[] = new Array()
  getmaterial() {
    this.service.Material(this.DeptId, this.LoactionId).subscribe((data: any) => {
      this.materialdata = data

      console.log(this.materialdata);

      if (this.materialdata.length === 0) {
        this.toastr.error('No Material Found..Please Contact Adminstrator')
      }
    })
  }
  materialId: number = 0
  RawMatName: any = ''
  materialEvent() {
    console.log(this.materialId);
    const RawMatName = this.materialdata.filter((res: any) => {
      if (this.materialId === res.Rawmatid) {
        this.RawMatName = res.Rawmatname
        console.log(this.RawMatName, 'material');
      }
    })
    if (this.materialId !== undefined && this.materialId !== null && this.materialId !== 0) {
      // this.ViewRecivedMaterial()

    }
  }
  searchFn: any;
  customSearchFn(term: string, item: any) {
    return item.Rawmatname.toLowerCase().startsWith(term.toLowerCase())
  }
  RecivedMaterial: any[] = new Array()
  ViewRecivedMaterial() {
    this.service.ViewRecivedMaterial(this.LoactionId, this.materialId, this.DeptId).subscribe((data: any) => {
      this.RecivedMaterial = data
      if (this.RecivedMaterial.length !== 0) {
        this.MaterialTabel = true
      } else {
        this.toastr.warning('No Records To Found')

      }
    })
  }
  Returnqty: any = 0
  Returnvalue: any = 0
  conditionMet: boolean = false;
  MaterialTabel: boolean = false
  ReturnqtyEvent(event: any) {
    this.Returnqty = event.target.value
    document.addEventListener('change', function(event:any) {
      if (event.target.classList.contains('returnQty')) {
          let input = event.target;
          let row = input.closest('tr');
          let balQty = parseFloat(row.querySelector('.balQty').textContent);
          let returnQty = parseFloat(input.value);

          if (returnQty > balQty) {
              let excess = returnQty - balQty;
              input.value = balQty;

              let nextRow = row.nextElementSibling;
              while (nextRow && excess > 0) {
                  let nextBalQty = parseFloat(nextRow.querySelector('.balQty').textContent);
                  let nextInput = nextRow.querySelector('.returnQty');

                  if (nextBalQty > 0) {
                      if (excess <= nextBalQty) {
                          nextInput.value = excess;
                          excess = 0;
                      } else {
                          nextInput.value = nextBalQty;
                          excess -= nextBalQty;
                      }
                  }
                  nextRow = nextRow.nextElementSibling;
              }
          }
      }
  });
  }

}
