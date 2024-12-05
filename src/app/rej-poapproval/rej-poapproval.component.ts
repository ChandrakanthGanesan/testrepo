import { Component, OnInit } from '@angular/core';
import { RejPOApprovalService } from '../service/rej-poapproval.service';

@Component({
  selector: 'app-rej-poapproval',
  templateUrl: './rej-poapproval.component.html',
  styleUrls: ['./rej-poapproval.component.scss']
})
export class RejPOApprovalComponent implements OnInit {
  constructor(private service: RejPOApprovalService) { }
  ngOnInit() {
    this.Load()
    const locationid = JSON.parse(sessionStorage.getItem('location') || '{}')
    // this.LocationId = locationid[0]
    this.LocationId = 1

    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    // this.empid = user[0].empid
    this.empid = 154234
  }
  supplier: number | null = null
  LocationId: number = 0
  supid: number | null = null
  currentDateTime: any
  empid: number = 0
  selectedSupplier: any
  //Array
  tableArray: any[] = []
  SupplierArray: any[] = []

  Load() {
    this.service.Supplier().subscribe((result: any) => {
      this.SupplierArray = result
    })
  }

  supidfun(e: any) {
    const supID = e
    this.supid = supID.supid
  }

  view() {
    this.tableArray = []
    if (this.supid === null) {
      this.service.allSupplier(this.LocationId).subscribe((result: any) => {
        this.tableArray = result
        console.log(this.tableArray);
      })
    }
    else {
      this.service.oneSupplier(this.LocationId, this.supid).subscribe((result: any) => {
        this.tableArray = result
      })
    }
  }

  // selectedRows: any[] = [];
  // onRowSelectionChange(event: any, row: any): void {
  //   if (event.target.checked) {
  //     // Add the row to the selectedRows array if checked
  //     this.selectedRows.push(row);
  //   } else {
  //     // Remove the row from the selectedRows array if unchecked
  //     this.selectedRows = this.selectedRows.filter(selectedRow => selectedRow !== row);
  //   }
  //   console.log(this.selectedRows); // Debugging to check selected rows
  // }
  selectedRows: any[] = []
  selectedrows(event: any, row: any) {
    if (event.target.checked) {
      this.selectedRows.push(row)
    }
    else {
      this.selectedRows = this.selectedRows.filter(selectedRow => selectedRow !== row)
    }
    console.log(this.selectedRows[0].poid);
  }
  approveData: any[] = []
  Approve() {
    const now = new Date();
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`

    for (let i = 0; i < this.selectedRows.length; i++) {
      this.approveData.push({
        POID: this.selectedRows[i].poid,
        empid: this.empid,
        approvaldatetime: formattedTime
      })
    }
    console.log(this.approveData, 'this.approveData');
    this.service.Approve(this.approveData).subscribe((result: any) => {
      const response = result
      console.log(response);
      this.selectedRows = []
      this.tableArray = []
      this.selectedRows = []
      this.supplier = null
      this.LocationId = 0
      this.supid = null
      this.currentDateTime = ''
      this.empid = 0
      this.selectedSupplier = null
    })
  }
  clear() {
    this.selectedRows = []
    this.tableArray = []
    this.selectedRows = []
    this.supplier = null
    this.LocationId = 0
    this.supid = null
    this.currentDateTime = ''
    this.empid = 0
    this.selectedSupplier = null
  }
}
