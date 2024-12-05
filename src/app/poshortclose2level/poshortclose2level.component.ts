import { Component, OnInit } from '@angular/core';
import { Poshortclose2levelService } from '../service/poshortclose2level.service';

@Component({
  selector: 'app-poshortclose2level',
  templateUrl: './poshortclose2level.component.html',
  styleUrls: ['./poshortclose2level.component.scss']
})
export class Poshortclose2levelComponent implements OnInit {
  constructor(private service: Poshortclose2levelService) { }
  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    // this.empid = user[0].empid'
    this.empid = 1
    this.load()
  }
  empid: number | null = null

  loadArray: any[] = []
  load() {
    this.service.load(this.empid).subscribe((result: any) => {
      this.loadArray = result
      console.log(this.loadArray);
    })
  }
  tableArray: any
  table() {
    this.service.table().subscribe((result: any) => {
      this.tableArray = result
      console.log(this.tableArray);
    })
  }
  selectedrowsArray: any[] = []
  selectedrows(event: any, row: any) {

    if (event.target.checked) {
      this.selectedrowsArray.push(row)
    }
    else {
      this.selectedrowsArray = this.selectedrowsArray.filter(selectedrow => selectedrow !== row)
    }
    console.log(this.selectedrowsArray, 'selectedrowsArray');
  }
  approveArray: any[] = []
  approve() {
    this.approveArray = []
    if (this.selectedrowsArray.length > 0) {
      const now = new Date();
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`
      console.log(formattedTime);

      for (let i = 0; i < this.selectedrowsArray.length; i++) {
        this.approveArray.push({
          empid: this.empid,
          poclosedon: formattedTime,
          poproductid: this.selectedrowsArray[i].poproductid,
          poid: this.selectedrowsArray[i].poid
        })
      }
      console.log(this.approveArray);
      this.service.approve(this.approveArray).subscribe((result: any) => {
        const approvedArray = result
        console.log(approvedArray);
        this.empid = null
        this.tableArray = []
        this.selectedrowsArray = []
        this.approveArray = []
      })
    }
    else
    {
      alert("select rows")
    }
  }
  clear() {
    this.empid = null
    this.tableArray = []
    this.selectedrowsArray = []
    this.approveArray = []
  }
}
