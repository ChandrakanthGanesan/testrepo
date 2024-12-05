import { Component, OnInit } from '@angular/core';
import { PocloseService } from '../service/poclose.service';


interface TableRow {
  pono: string;
  podate: string;
  rawmatname: string;
  ord_qty: number;
  billqty: number;
  reason: string;
  poproductid: number;
  poid: number
}

@Component({
  selector: 'app-poclose',
  templateUrl: './poclose.component.html',
  styleUrls: ['./poclose.component.scss']
})
export class PocloseComponent implements OnInit {

  constructor(private service: PocloseService) {
  }
  ngOnInit(): void {
    this.Load()
    const locationid = JSON.parse(sessionStorage.getItem('location') || '{}')
    // this.LocationId = locationid[0]
    this.LocationId = 1
  }
  type: number | null = 0
  fromdate: any
  today: string = new Date().toISOString().slice(0, 10);
  todate: any
  selectedsupplier: any;
  LocationId: number = 0
  SupplierArray: any[] = []
  LoadArray: any[] = []
  subconid: number | null = 0
  reason: string = ''
  Load() {
    this.service.Load().subscribe((result: any) => {
      this.LoadArray = result
    })
  }
  //PO Type
  PoType(event: any) {
    if (this.fromdate) {
      if (this.todate) {
        if (this.fromdate && this.todate) {
          if (this.todate > this.fromdate) {
            this.Load
            const selectElement = event.target as HTMLSelectElement;
            this.type = Number(selectElement.value);
            console.log(this.type);
            console.log(this.LocationId);
            console.log(this.fromdate);
            console.log(this.todate);
            this.service.supplier(this.type, this.LocationId, this.fromdate, this.todate).subscribe((result: any) => {
              this.SupplierArray = result.flat(Infinity);
            });
          }
          else {
            alert("select date correctly")
          }
        } else {
          alert("Check From and To date selected or not")
        }
      }
      else {
        alert("select to date correctly")
      }
    }
    else {
      alert("select from date correctly")
      this.type = null
    }
  }

  //Date
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
  frm(e: any) {
    const selectedDate = new Date(e.target.value);
    const currentDateTime = new Date();
    selectedDate.setHours(currentDateTime.getHours());
    selectedDate.setMinutes(currentDateTime.getMinutes());
    selectedDate.setSeconds(currentDateTime.getSeconds());
    selectedDate.setMilliseconds(currentDateTime.getMilliseconds());
    this.fromdate = this.formatDate(selectedDate);
  }
  to(e: any) {
    const selectedDate = new Date(e.target.value);
    const currentDateTime = new Date();
    selectedDate.setHours(currentDateTime.getHours());
    selectedDate.setMinutes(currentDateTime.getMinutes());
    selectedDate.setSeconds(currentDateTime.getSeconds());
    selectedDate.setMilliseconds(currentDateTime.getMilliseconds());
    this.todate = this.formatDate(selectedDate);
  }
  //Supplier
  onSupplierChange(selectedSupplierId: any) {
    this.TableArray = []
    if (this.type && this.LocationId && this.fromdate && this.todate) {
      this.selectedsupplier = selectedSupplierId;
      this.table()
    }
    else {
      alert('Select type and date')
    }
  }
  TableArray: any[] = []
  table() {
    this.subconid = this.selectedsupplier
    this.service.table(this.type, this.LocationId, this.selectedsupplier, this.type, this.fromdate, this.todate, this.subconid).subscribe((result: any) => {
      this.TableArray = result
    })
  }
  selectedRows: TableRow[] = [];  // Explicitly typed as TableRow array
  isAllSelected = false;

  toggleSelectAll(event: any) {
    this.isAllSelected = event.target.checked;
    if (this.isAllSelected) {
      // Check if all rows have a reason before selecting
      const missingReasons = this.TableArray.filter(row => !row.reason.trim());
      if (missingReasons.length > 0) {
        alert("Please enter a reason for each row before selecting all.");
        this.isAllSelected = false;
        // this.selectedRows = [];
      } else {
        this.selectedRows = [...this.TableArray];
      }
    } else {
      this.selectedRows = [];
    }
  }

  toggleRowSelection(event: any, row: TableRow) {
    if (event.target.checked) {
      if (!row.reason) {
        alert("Please enter a reason before selecting this row.");
        event.target.checked = false;
        return;
      }
      if (!this.selectedRows.includes(row)) {
        this.selectedRows.push(row);
      }
    } else {
      this.selectedRows = this.selectedRows.filter(item => item !== row);
    }
    this.isAllSelected = this.selectedRows.length === this.TableArray.length;
  }
  updateArray: any[] = []
  updatedArray: any[] = []
  update() {
    console.log(this.selectedRows.length);
    console.log(this.selectedRows);
    for (let i = 0; i < this.selectedRows.length; i++) {
      this.updateArray.push({
        type: this.type,
        reason: this.selectedRows[i].reason,
        poproductid: this.selectedRows[i].poproductid,
        poid: this.selectedRows[i].poid
      })
    }
    console.log(this.updateArray);
    this.service.update(this.updateArray).subscribe((result: any) => {
      this.updatedArray = result
      window.location.reload();

      console.log(this.updatedArray);
    })
  }
  clear() {
    window.location.reload();
  }
}