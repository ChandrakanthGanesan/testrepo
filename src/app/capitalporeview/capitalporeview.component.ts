import { Component, OnInit } from '@angular/core';
import { CapitalporeviewService } from '../service/capitalporeview.service';

@Component({
  selector: 'app-capitalporeview',
  templateUrl: './capitalporeview.component.html',
  styleUrls: ['./capitalporeview.component.scss']
})
export class CapitalporeviewComponent implements OnInit {
  constructor(private service: CapitalporeviewService) { }
  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    // this.empid = user[0].empid
    this.empid = 1
    this.Load()
  }
  empid: number | null = null

  LoadArray: any[] = []
  Load() {
    this.service.load(this.empid).subscribe((result: any) => {
      this.LoadArray = result
    })
  }

  reviewer() {

    console.log(this.empid);
  }

  tableArray: any[] = []
  view() {
    this.service.table().subscribe((result: any) => {
      this.tableArray = result
      console.log(this.tableArray)
    })
  }

  selectedrowArray: any[] = []
  selectedrows(event: any, row: any) {
    if (event.target.checked) {
      this.selectedrowArray.push(row)
    }
    else {
      this.selectedrowArray = this.selectedrowArray.filter(selectedRow => selectedRow !== row)
    }
    console.log(this.selectedrowArray);
  }
  reviewArray: any[] = []
  review() {
    if (this.selectedrowArray.length > 0) {

      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.000`

      for (let i = 0; i < this.selectedrowArray.length; i++) {
        this.reviewArray.push({
          empid: this.empid,
          reviewon: formattedTime,
          id: this.selectedrowArray[i].id
        })
      }

      this.service.review(this.reviewArray).subscribe((result: any) => {
        const review = result
        console.log(review);
        this.selectedrowArray = []
      })
    }
    else {
      alert("Select rows")
    }
  }

  clear() {
    this.empid = 0
    this.tableArray = []
    this.selectedrowArray = []
    this.reviewArray = []
    console.log(this.empid);

  }
}
