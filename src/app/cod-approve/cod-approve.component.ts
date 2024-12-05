import { Component, OnInit } from '@angular/core';
import { CODApproveService } from '../service/cod-approve.service';

@Component({
  selector: 'app-cod-approve',
  templateUrl: './cod-approve.component.html',
  styleUrls: ['./cod-approve.component.scss']
})
export class CODApproveComponent implements OnInit {
  constructor(private service: CODApproveService) { }
  ngOnInit() {
    const locationid = JSON.parse(sessionStorage.getItem('location') || '{}')
    // this.LocationId = locationid[0]
    this.LocationId = 1

    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    // this.Empid = user[0].empid
    this.Empid = 12
    this.load()
  }

  LocationId: number = 0
  approverId: number | null = null
  Empid: number | null = null


  ApproverArray: any[] = []
  load() {
    this.service.load(this.LocationId).subscribe((result: any) => {
      this.ApproverArray = result
      console.log(this.ApproverArray);
    })
  }

  tableArray: any[] = []
  Approver(event: any) {
    const approverId = event
    this.approverId = approverId.empid
    console.log(this.approverId);
  }

  view() {
    if (this.approverId) {
      this.service.table(this.LocationId).subscribe((result: any) => {
        this.tableArray = result
        console.log(this.tableArray);
      })
    }
    else {
      alert("Select Approver")
    }

  }

  selectedRows: any[] = []
  selectedrows(event: any, row: any) {
    if (event.target.checked) {
      this.selectedRows.push(row)
    }
    else {
      this.selectedRows = this.selectedRows.filter(selectedRow => selectedRow !== row)
    }
    console.log(this.selectedRows);
  }

  approveArray: any[] = []
  approve() {
    const now = new Date();
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`
    console.log(formattedTime);

    this.service.approve(this.selectedRows).subscribe((result: any) => {
      this.approveArray = result
      console.log(this.approveArray);
    })
  }

  clear() {
    this.LocationId = 0
    this.approverId = null
    this.Empid = null
    this.ApproverArray = []
    this.tableArray = []
    this.selectedRows = []
    this.approveArray = []
    window.location.reload()
  }
}