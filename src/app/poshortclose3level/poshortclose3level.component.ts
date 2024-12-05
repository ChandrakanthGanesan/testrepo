import { Component, OnInit } from '@angular/core';
import { Poshortclose3levelService } from '../service/poshortclose3level.service';

@Component({
  selector: 'app-poshortclose3level',
  templateUrl: './poshortclose3level.component.html',
  styleUrls: ['./poshortclose3level.component.scss']
})
export class Poshortclose3levelComponent implements OnInit {
  constructor(private service: Poshortclose3levelService) { }
  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    // this.empid = user[0].empid
    this.empid = 1
    this.load()

    console.log(this.empid);

  }
  empid: number = 0

  loadArray: any[] = []
  load() {
    this.service.load(this.empid).subscribe((result: any) => {
      this.loadArray = result
      console.log(this.loadArray);
    })
  }
  tableArray: any[] = []
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
      this.selectedrowsArray = this.selectedrowsArray.filter(selectedrows => selectedrows !== row)
    }
    console.log(this.selectedrowsArray);
  }

  approveArray: any[] = []
  approve() {
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
      this.selectedrowsArray.forEach((row) => {
        this.approveArray.push({
          empid: this.empid,
          poclosedon: formattedTime,
          poproductid: row.poproductid,
          poid: row.poid
        });
      });

      console.log(this.approveArray)
      this.service.approve(this.approveArray).subscribe((result: any) => {
        this.approveArray = result
        this.empid = 0
        this.approveArray = []
        this.selectedrowsArray = []
        this.tableArray = []
      })
    }
    else {
      alert("Selected Rows")
    }
  }

  clear() {
    this.empid = 0
    this.approveArray = []
    this.selectedrowsArray = []
    this.tableArray = []
  }
}
