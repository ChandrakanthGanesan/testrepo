
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



  }
  btn(){
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
    this.items[index].allowAdd = this.items[index].TransferQty !== null && this.items[index].TransferQty > 0;
    if (this.items[index].TransferQty === null || this.items[index].TransferQty === 0) {
      this.items[index].allowAdd = false;
      this.clearReadonlyState();
    }
  }

  confirmTransferQty(index: number): void {
    if (this.items[index].TransferQty !== null && this.items[index].TransferQty > 0) {
      // Disable the current input field
      this.items[index].readOnly = true;
      this.items[index].allowAdd = false;
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

  // Check if any TransferQty is unconfirmed (entered but add button not clicked)
  isAnyUnconfirmedTransferQty(currentIndex: number): boolean {
    return this.items.some((item, index) => {
      return index !== currentIndex && item.TransferQty !== null && item.TransferQty > 0 && !item.readOnly;
    });
  }

  // Clear readonly state for all rows
  clearReadonlyState(): void {
    this.items.forEach((item) => {
      item.readOnly = false;
    });
  }
}
