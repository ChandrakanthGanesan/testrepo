import { Component } from '@angular/core';
import { PoapprovalService } from '../service/poapproval.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-po-approval',
  templateUrl: './po-approval.component.html',
  styleUrls: ['./po-approval.component.scss']
})
export class PoApprovalComponent {
  constructor(private service: PoapprovalService) { }

  type: string | null = null
  Empid: number = 0
  selectedLocationId: number = 0
  selectedSupplierId: number = 0
  poid: number = 0
  pono: number = 0
  rawmatid: number = 0
  isVisible: boolean = false


  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = 154234
    console.log(this.Empid);
    this.DisplayLocation()
    this.supplier()
  }

  location(e: Event) {
    console.log(this.selectedLocationId);
  }

  supplierID(e: Event) {
    console.log(this.selectedSupplierId);
  }

  typeValue(e: Event) {
    const a = e.target as HTMLInputElement;
    this.type = a.value;
    console.log(this.type);
  }


  //Api
  //Location
  LocationArray: any[] = []
  DisplayLocation() {
    this.service.Location1().subscribe((result: any) => {
      this.LocationArray = result
    })
  }
  //Supplier
  supplierArray: any[] = []
  supplier() {
    this.service.supplier().subscribe((result: any) => {
      this.supplierArray = result
    })
  }
  //Table
  tableArray: any[] = []
  poValueArray: any[] = []
  table() {
    this.tableArray = []
    if (this.type && this.selectedLocationId && this.selectedSupplierId) {
      this.service.table(this.type, this.selectedLocationId, this.selectedSupplierId).subscribe((result: any) => {
        this.tableArray = result
        console.log(this.tableArray);
        this.poid = this.tableArray[0].poid
        this.rawmatid = this.tableArray[0].rawmatid
        this.pono = this.tableArray[0].pono
        console.log(this.poid);
        this.povalue()
        this.isVisible = true
      })
    }
    else {
      alert("Select All fields ")
    }
  }
  //PO value
  povalue() {
    this.service.povalue(this.type, this.poid).subscribe((result: any) => {
      this.poValueArray = result
      console.log(this.poValueArray[0].povalue);
    })
  }
  // Selected All
  selectedAll: boolean = false;
  SelectAll() {
    this.tableArray.forEach(row => {
      row.selected = this.selectedAll;
    });
    this.SelectedRows();
  }

  // Mail
  AllMail: boolean = false;
  Mail() {
    this.tableArray.forEach(row => {
      row.mail = this.AllMail;
      console.log(row.mail, 'row mail');
    });
    this.SelectedRows();
  }

  // SMS
  sms: boolean = false;
  SMS() {
    this.tableArray.forEach(row => {
      row.sms = this.sms;
    });
    this.SelectedRows();
  }

  // Selected rows array
  selectedRows: any[] = [];
  SelectedRows() {
    this.selectedRows = this.tableArray.filter(row => row.selected);
    console.log(this.selectedRows, 'selectedRows');
  }
  //Approve
  ApproveArray: any[] = []
  ApprovedArray: any[] = []
  Approve() {
    console.log(this.selectedRows);
    if (this.selectedRows.length !== 0) {
      for (let i = 0; i < this.selectedRows.length; i++) {
        this.ApproveArray.push({
          type: this.type,
          empid: this.Empid,
          poid: this.tableArray[0].poid,
          loactionID: this.selectedLocationId,
          pono: this.pono
        })
        console.log(this.ApproveArray, 'this.ApproveArray');
        this.service.Approve(this.ApproveArray).subscribe((result: any) => {
          this.ApprovedArray = result
          this.selectedRows = []
          this.tableArray = []
          this.selectedLocationId = 0
          this.selectedSupplierId = 0
          this.type = null
          this.selectedAll = false
          const aps = document.getElementById('Approve status')
          aps?.click()
          console.log(this.ApprovedArray);
        })
      }
    }
    else {
      const norowsselected = document.getElementById("no rows");
      norowsselected?.click();
      return;
    }
  }

  //PO Old
  oldPO1Array: any[] = []
  oldPO2Array: any[] = []
  oldPO() {
    if (this.type && this.selectedLocationId && this.selectedSupplierId) {
      this.service.oldpo1(this.rawmatid).subscribe((result: any) => {
        this.oldPO1Array = result
        console.log(this.oldPO1Array);
      })
      this.service.oldpo2(this.rawmatid).subscribe((result: any) => {
        this.oldPO2Array = result
        console.log(this.oldPO2Array);
      })
    }
    else {
      alert('Enter all fields')
    }
    const oldpo = document.getElementById('oldpomodal')
    oldpo?.click()
  }

  clearSelection() {
    this.type = null; 
    console.log('Type cleared');
  }
}
