
import { Component, OnInit } from '@angular/core';
import { FormBuilder, } from '@angular/forms';
import { NewpoService } from '../service/newpo.service';
declare var $: any;
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DemoComponent implements OnInit {



  constructor(private Fb: FormBuilder, private service: NewpoService) { }

  ngOnInit() {
    this.GetPOMainTable()
  }
  PurchaseType: string = 'Capital'
  SupplierId: number = 855
  LocationId: number = 1
  departmentId: number = 12
  POMainTableArray: any[] = new Array()
  GetPOMainTable() {
    this.service.mainTable(this.PurchaseType, this.SupplierId, this.LocationId, this.departmentId).subscribe((result: any) => {
      this.POMainTableArray = result
      console.log(this.POMainTableArray);
    })
  }
}
