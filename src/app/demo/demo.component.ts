
import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { StoretostoreService } from '../service/storetostore.service';
declare var $: any;
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DemoComponent  {



  savebtn:boolean=false
  constructor(private fb: FormBuilder ,private service :StoretostoreService) { }
  items:any []=new Array()
  RawmaterialId:number=14850
  LoactionId:number=1
  ngOnInit() {

    const storefrmid=26


    this.service.ViewStock(this.LoactionId, storefrmid, this.RawmaterialId).subscribe({
      next: (res: any) => {

        this.items = res
        console.log(this.items, ' this.ViewStockData');
        if (this.items.length > 0) {
          const newarr = {
            TransferQty: null,
            readOnly: false,
            allowAdd: false,
          }

          this.items.forEach(obj => {
            Object.assign(obj, newarr);
          });
          console.log(this.items, ' this.ViewStockData');

          const Total = this.items.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.Stock), 0);
        }
      },
      })

  }

  onTransferQtyInput(index: number): void {
    debugger
    this.items[index].allowAdd = this.items[index].TransferQty !== null && this.items[index].TransferQty > 0;
    if(this.items[index-1].allowAdd === true){
      alert('pppp')
    }
  }

  enableNextRow(index: number): void {
    if (this.items[index].TransferQty !== null && this.items[index].TransferQty > 0) {
      for (let i = index + 1; i < this.items.length; i++) {
        this.items[i].readOnly = false;
      }
      this.items[index].allowAdd = false; // Disable the current add button
    } else {
      alert('Please enter a valid TransferQty before proceeding.');
    }
  }

  removeRow(index: number): void {
    this.items.splice(index, 1);
    // Optionally, you may want to handle enabling/disabling next rows here
    if (index < this.items.length && index > 0) {
      this.items[index - 1].readOnly = false;
    }
  }

}
