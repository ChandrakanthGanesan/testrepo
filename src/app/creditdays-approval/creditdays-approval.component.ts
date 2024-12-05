import { Component, OnInit } from '@angular/core';
import { CreditdaysApprovalService } from '../service/creditdays-approval.service';
declare var bootstrap: any;

@Component({
  selector: 'app-creditdays-approval',
  templateUrl: './creditdays-approval.component.html',
  styleUrls: ['./creditdays-approval.component.scss']
})
export class CreditdaysApprovalComponent implements OnInit {
  constructor(private service: CreditdaysApprovalService) { }
  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    // this.empid = user[0].empid
    this.empid = 154234
    this.load()
  }

  empid: number = 0
  currentRowIndex: number | null = null
  rowPendingConfirmation: any
  loadArray: any[] = []
  load() {
    this.service.load(this.empid).subscribe((result: any) => {
      this.loadArray = result
      console.log(this.loadArray);

    })
  }

  approver(event: any) {
    const approver = event.target.value
    console.log(approver);
  }

  tableArray: any[] = []
  table() {
    this.service.table().subscribe((result: any) => {
      this.tableArray = result
      console.log(this.tableArray);

    })
  }
  selectedRowApprove: any[] = [];
  selectedRowRej: any[] = [];
  rowBeingChanged: any | null = null;
  checkboxTypeBeingChanged: string | null = null; // 'approve' or 'reject'

  ApproveCheck(event: any, row: any) {
    if (event.target.checked) {
      if (this.selectedRowRej.includes(row)) {
        // If rejection is already checked, show modal
        this.rowBeingChanged = row;
        this.checkboxTypeBeingChanged = 'approve';
        event.target.checked = false; // Temporarily prevent change
        const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
        modal.show();
      } else {
        this.selectedRowApprove.push(row);
      }
    } else {
      this.selectedRowApprove = this.selectedRowApprove.filter(selectedRow => selectedRow !== row);
    }
    console.log(this.selectedRowApprove, 'selectedRowApprove');
  }

  rejectionCheck(event: any, row: any) {
    if (event.target.checked) {
      if (this.selectedRowApprove.includes(row)) {
        // If approval is already checked, show modal
        this.rowBeingChanged = row;
        this.checkboxTypeBeingChanged = 'reject';
        event.target.checked = false; // Temporarily prevent change
        const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
        modal.show();
      } else {
        this.selectedRowRej.push(row);
      }
    } else {
      this.selectedRowRej = this.selectedRowRej.filter(selectedRow => selectedRow !== row);
    }
    console.log(this.selectedRowRej, 'selectedRowRej');
  }

  // Handle modal confirmation
  confirmChange() {
    if (this.rowBeingChanged && this.checkboxTypeBeingChanged) {
      if (this.checkboxTypeBeingChanged === 'approve') {
        this.selectedRowApprove.push(this.rowBeingChanged);
        this.selectedRowRej = this.selectedRowRej.filter(row => row !== this.rowBeingChanged);
      } else if (this.checkboxTypeBeingChanged === 'reject') {
        this.selectedRowRej.push(this.rowBeingChanged);
        this.selectedRowApprove = this.selectedRowApprove.filter(row => row !== this.rowBeingChanged);
      }
    }
    this.rowBeingChanged = null;
    this.checkboxTypeBeingChanged = null;
  }

  cancelChange() {
    // Reset values if the user cancels
    this.rowBeingChanged = null;
    this.checkboxTypeBeingChanged = null;
  }

  rejectionArray: any[] = []
  ApproveArray: any[] = []
  update() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`

    if (this.selectedRowRej.length > 0) {
      console.log(this.selectedRowRej.length);
      for (let i = 0; i < this.selectedRowRej.length; i++) {
        this.rejectionArray.push({
          empid: this.empid,
          approveddate: formattedTime,
          id: this.selectedRowRej[i].id,
          supid: this.selectedRowRej[i].supid,
          creditperiod: this.selectedRowRej[i].newcreditperiod
        })
      }
    }
    if (this.selectedRowApprove.length > 0) {
      console.log(this.selectedRowApprove.length);
      for (let i = 0; i < this.selectedRowApprove.length; i++) {
        this.ApproveArray.push({
          empid: this.empid,
          approveddate: formattedTime,
          id: this.selectedRowApprove[i].id,
          supid: this.selectedRowApprove[i].supid,
          creditperiod: this.selectedRowApprove[i].newcreditperiod
        })
      }
    }
    this.approve()
    // this.reject()
  }

  approve() {
    console.log(this.ApproveArray);
    this.service.approve(this.ApproveArray).subscribe((result: any) => {
      const approveArray = result
      console.log(approveArray);
    })
  }

  reject() {
    console.log(this.rejectionArray);
    this.service.reject(this.rejectionArray).subscribe((result: any) => {
      const rejectArray = result
      console.log(rejectArray);
    })
  }
}
