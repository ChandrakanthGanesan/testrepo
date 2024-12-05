import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NewpoService } from '../service/newpo.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-new-purchase-order',
  templateUrl: './new-purchase-order.component.html',
  styleUrls: ['./new-purchase-order.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewPurchaseOrderComponent implements OnInit {

  constructor(private service: NewpoService, private http: HttpClient, private spinner: NgxSpinnerService) { }
  //Declaration
  LocationId: number = 1
  Department: string = ''
  departmentId: string = '1'
  SupplierName: string = ''
  SupplierId: number = 1
  rawMatlId: number = 1
  PurchaseType: any
  currencyType: string = ''
  ExchangeRate: string = ''
  Location: number = 1
  CurrentId: number = 0
  CostCenter: string = ''
  paymentTerms: string = ''
  termID: number = 0
  creditPeriod: string = ''
  today: string = ''
  todayNext: any = ''
  scheduleDate: boolean = false
  schedDateSave: string = ''
  SchedDate: string = ''
  rate: number = 0
  PONO: any
  PoNO: any
  PONOlike: any
  increno: number = 0
  effsdate: number = 0
  effedate: number = 0
  POQty: number = 0
  selectedIndex: number = 0
  selectedObject: any[] = []
  attachment: File | null = null;
  Comment: string = ''
  paramsdep: any
  systemname: string = ''
  temppono: string = ''
  podate: string = ''
  devpo: string = ''
  trailpo: string = ''
  validupto: string = ''
  entrydateTime: string = ''
  transporterId: number = 0
  freight_incl: string = ''
  Empid: number = 0
  filename: any
  freight: number = 0
  packing: number = 0
  Rate1: number = 0
  ModeOfTransport: string = ''
  InsuranceTerms: string = ''
  term: number = 0
  detail: string = ''
  advance: string = ''
  percentage: number = 0
  attachment_name: string = ''
  Internal: string = ''
  suppldate: string = ''
  temppopro: string = ''
  //
  private dbName = 'fileDatabase';  // Database name
  private dbVersion = 1;            // Version number
  private db: IDBDatabase | undefined;  // Database reference
  //
  @ViewChild('attachmentInput') attachmentInput!: ElementRef;
  @ViewChild('fileSelect') fileSelect!: ElementRef;
  @ViewChild('fileImage') fileImage!: ElementRef;
  @ViewChild('fileDetails') fileDetails!: ElementRef;

  ngOnInit(): void {
    this.openDatabase()
    this.loadFileList()
    this.GetDepartment(this.LocationId)
    this.GetSupplierName()
    this.GetPurchaseType()
    this.GetCurrencyType()
    this.GetLocation()
    this.GetCostCenter()
    this.GetAddiDetailtab()
    this.GetPaymentTerms()
    this.pono()
    const todayDate = new Date()
    this.today = todayDate.toISOString().split('T')[0]
    this.validupto = this.today
    this.Internal = this.today
    this.suppldate = this.today
    const milliseconds = Math.floor(todayDate.getMilliseconds() / 10).toString().padStart(3, '0');
    const timePart = todayDate.toTimeString().split(' ')[0];
    this.podate = this.today + " " + timePart
    this.entrydateTime = this.today + " " + timePart + ":" + milliseconds
    this.todayNext = todayDate.toISOString().split('T')[0]
    this.SchedDate = todayDate.toISOString().split('T')[0]
    this.tempono()
    //
    const user = JSON.parse(sessionStorage.getItem('session') || '{}');
    this.Empid = user[0].empid
    //
    const locationid = JSON.parse(sessionStorage.getItem('location') || '{}')
    this.LocationId = locationid[0]
  }
  //tempono
  tempono() {
    const todayDate = new Date();
    const time = todayDate.toTimeString().split(" ")[0];
    const milliseconds = Math.floor(todayDate.getMilliseconds() / 10).toString().padStart(2, '0');
    const formattedTime = time.replace(/:/g, "-") + "-" + milliseconds;
    this.temppono = formattedTime
    this.temppopro = this.temppono.replace(/-/g, "")
    console.log(this.temppopro);
  }
  //Department
  GetDepartmentArray: any[] = []
  GetDepartment(LocationId: any) {
    this.service.department(LocationId).subscribe((result: any) => {
      this.GetDepartmentArray = result
    })
  }
  selDepartment(department: string) {
    this.Department = department
    this.service.departmentId(this.Department).subscribe((result: any) => {
      this.departmentId = result[0].deptid
      this.selectedObject = [];
      this.GetPaymentTermsArray = [];
      this.GetCostCenterArray = [];
      this.paymentDetailsArray = [];
      this.SupplierIDArray = [];
      this.addValueArray = [];
      this.termIDArray = [];
      this.GetCreditPerCurrTyArray = [];
      this.GetCurrtypeExchRateArray = [];
      this.POMainTableArray = [];
      this.POMainTableTaxArray1 = [];
      this.ponoArray = [];
      this.ponoCAPArray = [];
      this.ponoGPArray = [];
      this.POMainTableArray1 = [];
      this.maintablepoQtyArray = [];
      this.selectedRows = [];
      this.LocationId = this.LocationId;
      this.SupplierName = '';
      this.SupplierId = 1;
      this.rawMatlId = 1;
      this.PurchaseType = '';
      this.currencyType = '';
      this.ExchangeRate = '';
      this.CurrentId = 0;
      this.CostCenter = '';
      this.paymentTerms = '';
      this.termID = 0;
      this.creditPeriod = '';
      this.todayNext = '';
      this.scheduleDate = false;
      this.schedDateSave = '';
      this.PONO = '';
      this.PoNO = '';
      this.PONOlike = 0;
      this.increno = 0;
      this.maxpoID = 0;
      this.packQty = '';
      this.restrict = 0;
      this.PORaised = 0;
      this.TaxArray = [];
      this.attachment = null
      this.Comment = ''
      this.transporterName = ''
      this.schedDateSave = '';
      this.POQty = 0
      this.releasedata = []
    })
  }
  //Purchase Type
  GetPurchaseTypeArray: any[] = []
  GetPurchaseType() {
    this.service.purchaseType().subscribe((result: any) => {
      this.GetPurchaseTypeArray = result
    })
  }
  purchType(type: string) {
    this.PurchaseType = type
    this.pono()
    this.SupplierName = ''
    this.POMainTableArray = []
    this.POMainTableArray1 = []
    this.POMainTableTaxArray1 = []
    this.SupplierIDArray = []
    this.addValueArray = []
    this.maxpoID = 0
    this.termIDArray = []
    this.paymentDetailsArray = []
    this.currencyType = ''
    this.paymentTerms = ''
    this.ExchangeRate = ''
    this.CostCenter = ''
    this.creditPeriod = ''
    this.selectedRows = [];
    this.TaxArray = [];
    this.attachment = null
    this.Comment = ''
    this.transporterName = ''
    this.POQty = 0
    this.scheduleDate = false;
    this.schedDateSave = '';
    this.releasedata = []
  }
  //Currency Type
  GetCurrencyTypeArray: any[] = []
  GetCurrencyType() {
    this.service.currencyType().subscribe((result: any) => {
      this.GetCurrencyTypeArray = result
    })
  }
  //Location
  GetLocationArray: any[] = []
  GetLocation() {
    this.service.Location(this.LocationId).subscribe((result: any) => {
      this.GetLocationArray = result
      this.Location = this.GetLocationArray[0].location
    })
  }
  //Cost center
  GetCostCenterArray: any[] = []
  GetCostCenter() {
    this.service.CostCenter().subscribe((result: any) => {
      this.GetCostCenterArray = result
    })
  }
  costcenter(center: any) {
    this.CostCenter = center
  }
  //Additional Details Table
  GetAddiDetailtabArray: any[] = []
  GetAddiDetailtab() {
    this.service.addidetailtable().subscribe((result: any) => {
      this.GetAddiDetailtabArray = result
    })
  }
  //Payment Terms
  GetPaymentTermsArray: any[] = new Array()
  GetPaymentTerms() {
    this.service.paymentTerms().subscribe((result: any) => {
      this.GetPaymentTermsArray = result
    })
  }
  paymentDetailsArray: any[] = []
  payTerms(selectedTerm: string) {
    const selectedObject = this.GetPaymentTermsArray.find(
      (term) => term.terms === selectedTerm//selectedTerm is refer to selected terms value, term.terms - term refers to argument, 
      //terms refers to key in array.  term.terms === selectedTerm it checking both are same. if same that object will be saved on selectedObject
    );
    this.termID = selectedObject.termid
    this.service.paymentDetails(this.termID).subscribe((result: any) => {
      this.paymentDetailsArray = result
    })
  }
  //Today and next dates
  todaynext(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.todayNext = input.value;
  }
  //Schedule date
  checkBox(tick: Event) {
    this.scheduleDate = (tick.target as HTMLInputElement).checked
    if (this.scheduleDate) {
      this.schedDateSave = this.SchedDate
    } else {
      this.schedDateSave = ''
    }
  }
  //
  scheddateChange(change: any) {
    this.schedDateSave = change
    console.log(this.schedDateSave, "this.schedDateSave");

  }
  GetSupplierNameArray: any[] = []
  GetSupplierName() {
    this.service.supplierName().subscribe((result: any) => {
      this.GetSupplierNameArray = result
    })
  }
  SupplierIDArray: any[] = []
  addValueArray: any[] = []
  maxpoID: number = 0
  termIDArray: any[] = []
  supnamear: any[] = []
  SupplName(SupplrName: string) {
    this.scheduleDate = false;
    this.schedDateSave = '';
    this.TaxArray = [];
    this.attachment = null
    this.Comment = '';
    this.transporterName = '';
    this.POQty = 0;
    this.POMainTableArray = [];
    this.POMainTableArray1 = [];
    this.POMainTableTaxArray1 = [];
    this.maintablepoQtyArray = [];
    this.maintablepoQty = '';
    this.mainTable2Array = [];
    this.taxgroupidArray = [];
    this.selectedRows = [];
    this.paymentDetailsArray = [];
    this.releasedata = [];
    this.supnamear.push(SupplrName)
    // Fetch Supplier ID
    this.SupplierName = this.supnamear[0].supname
    console.log(this.SupplierName, "this.SupplierName");

    this.service.GetSupplierId(this.SupplierName).subscribe((result: any) => {
      this.SupplierIDArray = result;
      this.SupplierId = this.SupplierIDArray[0].supid;

      console.log('Location ID:', this.LocationId);
      console.log('Supplier ID:', this.SupplierId);

      // Fetch maxpoID
      this.service.maxpoID(this.LocationId, this.SupplierId).subscribe((result: any) => {
        this.maxpoID = result[0][""] // Replace "" with the actual key
        console.log('maxpoID:', this.maxpoID);

        // Fetch addValue
        this.service.addValue(this.maxpoID).subscribe((result: any) => {
          this.addValueArray = result;
          console.log(this.addValueArray, "this.addValueArray");

          // Check if addValueArray has valid data
          if (this.addValueArray && this.addValueArray.length > 0 && this.addValueArray[0]) {
            this.addValueArray[0]

            if (this.addValueArray[0].Rate) {
              this.Rate1 = this.addValueArray[0].Rate;
              console.log('Rate:', this.Rate1);
            }

            if (this.addValueArray[0]["Mode of Transport"]) {
              this.ModeOfTransport = this.addValueArray[0]["Mode of Transport"];
              console.log('Mode of Transport:', this.ModeOfTransport);
            }

            if (this.addValueArray[0]["Insurance Terms"]) {
              this.InsuranceTerms = this.addValueArray[0]["Insurance Terms"];
              console.log('Insurance Terms:', this.InsuranceTerms);
            }
          }
          // Continue with payment term logic
          if (this.POMainTableArray1.length > 0 && this.POMainTableArray1[0].paytermid) {
            this.termID = this.POMainTableArray1[0].paytermid;
          } else {
            this.termID = 0;
          }

          if (this.termID === 0) {
            this.service.termid(this.termID).subscribe((result: any) => {
              this.termIDArray = result;
              console.log(this.termIDArray, "termIDArray");
              this.paymentTerms = this.termIDArray[0]?.terms || '';
              this.service.paymentDetails(this.termID).subscribe((result: any) => {
                this.paymentDetailsArray = result;
                console.log(this.paymentDetailsArray, "this.paymentDetailsArray");
              });
            });
          } else {
            this.service.termid(this.termID).subscribe((result: any) => {
              this.termIDArray = result;
              console.log(this.termIDArray, "termIDArray");
              this.paymentTerms = this.termIDArray[0]?.terms || '';
              this.service.paymentDetails(this.termID).subscribe((result: any) => {
                this.paymentDetailsArray = result;
                console.log(this.paymentDetailsArray, "this.paymentDetailsArray")
                this.term = this.paymentDetailsArray[0].term
                this.percentage = this.paymentDetailsArray[0].perc
                this.advance = this.paymentDetailsArray[0].advance
                this.detail = this.paymentDetailsArray[0].detail
              });
            });
          }
          this.GetPOMainTable();
          this.GetPaymentTerms();
        });
      });
    });

    this.GetCreditPerCurrTy(); // Fetch Credit period and currid
  }

  //Credit Period  and Currency Type
  GetCreditPerCurrTyArray: any[] = []
  GetCreditPerCurrTy() {
    this.service.CreditPerCurrrtype(this.SupplierName).subscribe((result: any) => {
      this.GetCreditPerCurrTyArray = result
      this.creditPeriod = this.GetCreditPerCurrTyArray[0].creditperiod
      this.CurrentId = this.GetCreditPerCurrTyArray[0].currid
      this.GetCurrtypeExchRate()
    })
  }
  GetCurrtypeExchRateArray: any[] = []
  GetCurrtypeExchRate() {
    this.service.CurrtypeExchRate(this.CurrentId).subscribe((result: any) => {
      this.GetCurrtypeExchRateArray = result
      this.currencyType = this.GetCurrtypeExchRateArray[0].currdesc
      this.ExchangeRate = this.GetCurrtypeExchRateArray[0].exrate
    })
  }
  // Main Table
  POMainTableArray: any[] = []
  POMainTableArray1: any[] = []
  POMainTableTaxArray1: any[] = []
  maintablepoQtyArray: any[] = []
  maintablepoQty: any
  mainTable2Array: any[] = []
  taxgroupidArray: any[] = []
  TaxArray: any[] = []
  PORaised: number = 0
  restrict: number = 0
  packQty: any
  taxgroupid: string = ''
  taxpercentage: number = 0
  transporterName: string = ''
  discount: number = 0
  UOM: string = ''
  pricelistdetailid: number = 0
  prid: string = ''
  maintable3: any[] = []
  TaxId: any[] = []
  defaultValue: number = 0
  priority: number = 0
  PostingAccountId: number = 0
  Stock_Qty: number = 0
  oldpo1Ar: any[] = []
  oldpo2Ar: any[] = []
  rawmatname: string = ''

  GetPOMainTable() {
    this.service.mainTable(this.PurchaseType, this.SupplierId, this.LocationId, this.departmentId).subscribe((result: any) => {
      this.POMainTableArray = result
      console.log(this.POMainTableArray, "POMainTableArray");
      this.prid = this.POMainTableArray[0].prid
      this.rawmatname = this.POMainTableArray[0].rawmatname
      console.log(this.prid);
      this.UOM = this.POMainTableArray[0].uom
      if (this.POMainTableArray && this.POMainTableArray.length > 0 && this.POMainTableArray[0].rawmatid) {
        this.rawMatlId = this.POMainTableArray[0].rawmatid
      }
      this.rate = this.POMainTableArray[0].Rate
      this.service.maintablepoQty(this.rawMatlId, this.LocationId).subscribe((result: any) => {
        this.maintablepoQtyArray = result
        console.log(this.maintablepoQtyArray);
        if (this.maintablepoQtyArray && this.maintablepoQtyArray.length > 0 && this.maintablepoQtyArray[0].PackQty) {
          this.packQty = this.maintablepoQtyArray[0].PackQty;
          console.log(this.packQty, "this.packQty ");
          console.log(this.maintablepoQtyArray)
        } else {
          return
        }
        this.maintablepoQty = this.maintablepoQtyArray
        this.service.mainTable2(this.SupplierId, this.LocationId, this.rate, this.rawMatlId).subscribe((result: any) => {
          this.mainTable2Array = result
          console.log(this.mainTable2Array);
          this.restrict = this.mainTable2Array[0].qty1
          this.effsdate = this.mainTable2Array[0].effsdate.split('T')[0]
          this.effedate = this.mainTable2Array[0].effedate.split('T')[0]
          this.service.maintable3(this.rawMatlId, this.rate, this.SupplierId, this.LocationId, this.effsdate, this.effedate).subscribe((result: any) => {
            this.maintable3 = result
            console.log(this.maintable3, "this.maintable3")
            this.PostingAccountId = this.maintable3[0].PostingAccountId
            this.PORaised = this.maintable3[0].qty2
            this.Stock_Qty = this.maintable3[0].Stock_Qty
          })
        })
      })
      //Additional detail
      this.service.mainTable1(this.rawMatlId, this.SupplierId).subscribe((result: any) => {
        this.POMainTableArray1 = result
        console.log(this.POMainTableArray1, "POMainTableArray1")
        this.discount = this.POMainTableArray1[0].discount
        this.pricelistdetailid = this.POMainTableArray1[0].pricelistdetailid
        this.transporterId = this.POMainTableArray1[0].transporterid
        this.freight_incl = this.POMainTableArray1[0].freight_incl
        this.freight = this.POMainTableArray1[0].freight
        console.log(this.freight)
        this.packing = this.POMainTableArray1[0].packing
        console.log(this.packing, "this.packing");
        if (this.POMainTableArray1[0].freight_incl === "N") {
          this.transporterName = this.GetSupplierNameArray[0].isTransporter
        }
        //Main Table Tax column
        console.log(this.SupplierId)
        console.log(this.rawMatlId);
        this.service.mainTableTax(this.LocationId, this.rawMatlId, this.SupplierId).subscribe((result: any) => {
          this.POMainTableTaxArray1 = result
          console.log(this.POMainTableTaxArray1)
          console.log(this.POMainTableTaxArray1)
          this.taxgroupid = this.POMainTableTaxArray1[0].taxgroupid
          this.priority = this.POMainTableTaxArray1[0].Priority
          console.log(this.priority);
          this.service.taxper(this.taxgroupid).subscribe((result: any) => {
            this.taxgroupidArray = result
            console.log(this.taxgroupidArray)
            this.taxpercentage = this.taxgroupidArray[0].taxper
            console.log(this.taxpercentage);
          })
          this.service.taxtable(this.taxgroupid).subscribe((result: any) => {
            this.TaxArray = result
            for (let i = 0; i < this.TaxArray.length; i++) {
              console.log(this.TaxArray)
              this.TaxId.push(this.TaxArray[i].taxid)
            }
            this.defaultValue = this.TaxArray[0].DefaultValue
            console.log(this.defaultValue)
          })
        })
      })
      this.service.oldpo1(this.rawMatlId).subscribe((result: any) => {
        this.oldpo1Ar = result;
        console.log(this.oldpo1Ar, "oldpo1Ar");
      });
      this.service.oldpo2(this.rawMatlId).subscribe((result: any) => {
        this.oldpo2Ar = result
      })
    })
  }
  ponoArray: any[] = []
  ponoCAPArray: any[] = []
  ponoGPArray: any[] = []
  pono() {
    this.service.ponoformat(this.LocationId).subscribe((result: any) => {
      this.ponoArray = result
      if (this.PurchaseType === 'Capital') {
        this.PONO = this.ponoArray[0].prefix + this.ponoArray[0].prefixseperator + "CAP" + this.ponoArray[0].prefixseperator + this.ponoArray[0].compshort + this.ponoArray[0].prefixseperator + this.ponoArray[0].yeardisplay + this.ponoArray[0].prefixseperator
        this.PONOlike = this.PONO + '%'
        this.service.pono(this.PONO, this.PONOlike).subscribe((result: any) => {
          this.ponoCAPArray = result
          this.increno = this.ponoCAPArray[0][""]
          this.PoNO = this.PONO + this.increno
        })
      }
      else {
        this.PONO = this.ponoArray[0].prefix + this.ponoArray[0].prefixseperator + "GP" + this.ponoArray[0].prefixseperator + this.ponoArray[0].compshort + this.ponoArray[0].prefixseperator + this.ponoArray[0].yeardisplay + this.ponoArray[0].prefixseperator
        this.PONOlike = this.PONO + '%'
        this.service.pono(this.PONO, this.PONOlike).subscribe((result: any) => {
          this.ponoGPArray = result
          this.increno = this.ponoGPArray[0][""]
          this.PoNO = this.PONO + this.increno
        })
      }
    })
  }
  clear() {
    this.paymentDetailsArray = [];
    this.SupplierIDArray = [];
    this.addValueArray = [];
    this.termIDArray = [];
    this.POMainTableArray = [];
    this.POMainTableTaxArray1 = [];
    this.ponoArray = [];
    this.ponoCAPArray = [];
    this.ponoGPArray = [];
    this.POMainTableArray1 = [];
    this.maintablepoQtyArray = [];
    this.selectedRows = [];
    this.selectedObject = []
    this.TaxArray = [];
    this.releasedata = []
    this.selectedObject = [];
    this.GetAddiDetailtabArray = []
    this.GetPaymentTermsArray = []
    this.paymentDetailsArray = []
    this.GetSupplierNameArray = []
    this.addValueArray = []
    this.termIDArray = []
    this.POMainTableArray = []
    this.POMainTableArray1 = []
    this.POMainTableTaxArray1 = []
    this.maintablepoQtyArray = []
    this.mainTable2Array = []
    this.taxgroupidArray = []
    this.TaxArray = []
    this.maintable3 = []
    this.TaxId = []
    this.oldpo1Ar = []
    this.oldpo2Ar = []
    this.ponoArray = []
    this.ponoCAPArray = []
    this.ponoGPArray = []
    this.selectedRows = [];
    this.savedata = []
    this.releasedata = [];
    this.save2ProArray = []
    this.save3ProArray = []
    this.save4ProArray = []
    this.lastindex = []
    this.schedulepopAr = []
    //
    this.LocationId = this.LocationId;
    this.Department = '';
    this.departmentId = '1';
    this.SupplierName = '';
    this.SupplierId = 1;
    this.rawMatlId = 1;
    this.PurchaseType = '';
    this.currencyType = '';
    this.ExchangeRate = '';
    this.CurrentId = 0;
    this.CostCenter = '';
    this.paymentTerms = '';
    this.termID = 0;
    this.creditPeriod = '';
    this.todayNext = '';
    this.scheduleDate = false;
    this.schedDateSave = '';
    this.PONO = '';
    this.PoNO = '';
    this.PONOlike = 0;
    this.increno = 0;
    this.POQty = 0
    this.selectedIndex = 0
    this.attachment = null
    this.Comment = ''
    this.paramsdep = ''
    this.devpo = ''
    this.trailpo = ''
    this.transporterId = 0
    this.freight_incl = ''
    this.filename = ''
    this.freight = 0
    this.packing = 0
    this.Rate1 = 0
    this.ModeOfTransport = ''
    this.InsuranceTerms = ''
    this.term = 0
    this.detail = ''
    this.advance = ''
    this.percentage = 0
    this.attachment_name = ''
    this.maxpoID = 0;
    this.PORaised = 0
    this.restrict = 0;
    this.packQty = '';
    this.taxgroupid = ''
    this.taxpercentage = 0
    this.transporterName = ''
    this.discount = 0
    this.UOM = ''
    this.pricelistdetailid = 0
    this.prid = ''
    this.defaultValue = 0
    this.priority = 0
    this.PostingAccountId = 0
    this.Stock_Qty = 0
    this.rawmatname = ''
    this.selectedData.clear()
    this.value = 0;
    this.POQtyschedule = 100
    this.inputQty = 0
    this.checkpoQty = 0
    this.poscheck = 0
    this.transporterName = ''
    this.scheduleDate = false
    this.isCardVisible1 = false;
    this.devpoChecked = false;
    this.trialpochecked = false
    this.isAlreadyReleased = false;
  }
  isCardVisible1: boolean = false;
  isCardVisible() {
    return this.Department && this.PurchaseType && this.SupplierName;
  }
  next() {
    this.selectedIndex = 1;
  }
  back() {
    this.selectedIndex = 0
  }
  devpoChecked: boolean = false;
  devpo1() {
    this.devpo = this.devpoChecked ? 'Y' : 'N';
  }
  trialpochecked: boolean = false
  trailpo1() {
    this.trailpo = this.trialpochecked ? 'Y' : 'N'
  }


  selectedRows: any[] = [];
  selectedData: Set<any> = new Set();
  savedata: any[] = []

  onCheckboxChange(event: any, row: any) {
    if (event.target.checked) {
      this.selectedData.add(row);
    } else {
      this.selectedData.delete(row);
    }
    // Convert Set to Array for consistency
    this.selectedRows = Array.from(this.selectedData);
  }
  checkBoxOnEnter(checkbox: any, row: any): void {
    if (this.POQty > 0) {
      checkbox.checked = true; // Programmatically check the checkbox
      this.selectedData.add(row); // Add the row to the selectedData
      this.selectedRows = Array.from(this.selectedData); // Update the selectedRows array
    }
    else {
      checkbox.checked = false
    }
  }
  checkBoxOnBlur(checkbox: any, row: any): void {
    if (this.POQty > 0) {
      checkbox.checked = true; // Programmatically check the checkbox
      this.selectedData.add(row); // Add the row to the selectedData
    } else {
      checkbox.checked = false;
      this.selectedData.delete(row); // Remove the row from the selectedData if POQty is 0 or less
    }
    this.selectedRows = Array.from(this.selectedData); // Update the selectedRows array
  }


  value: number = 0;
  releasedata: any[] = [];
  isAlreadyReleased: boolean = false;

  // releaseSelected() {
  //   console.log(this.attachment_name);
  //   console.log(this.Internal);
  //   console.log(this.suppldate);
  //   console.log(this.Comment);
  //   if (this.POQty > 0 && this.poscheck === 1 && this.schedulepopAr.length > 0) {
  //     this.isCardVisible1 = true;
  //     this.devpo1();
  //     this.trailpo1();
  //     if (this.selectedRows.length > 0) {
  //       const isDuplicate = this.releasedata.some(data =>
  //         this.selectedRows.some(row => row.PR_Ref_No === data.PR_Ref_No)
  //       )
  //       if (isDuplicate) {
  //         const alreayexists = document.getElementById("alreayexisting")
  //         alreayexists?.click()
  //         return
  //       }
  //       if (this.isAlreadyReleased) {
  //         const releasedaction = document.getElementById("releasedaction")
  //         releasedaction?.click()
  //         return;
  //       }
  //       for (const row of this.selectedRows) {
  //         if (this.schedDateSave) {
  //           this.internal = this.schedDateSave
  //           console.log(this.internal, "this.internal")
  //         }
  //         else {
  //           this.internal = this.Internal
  //         }
  //         this.releasedata.push({
  //           pono: this.temppono,
  //           rawmatid: this.rawMatlId,
  //           prid: this.prid,
  //           internal: this.internal,
  //           suppdate: this.suppldate,
  //           qty: '1',
  //           PR_Ref_No: row.PR_Ref_No
  //         });
  //       }
  //       this.service.release(this.releasedata).subscribe(
  //         (result: any) => {
  //           const relstatus1 = document.getElementById("releasedstatus")
  //           relstatus1?.click()
  //           console.log("Success")
  //         }
  //       )
  //       this.isAlreadyReleased = true;
  //     } else {
  //       const selrows = document.getElementById("selrows")
  //       selrows?.click()
  //     }
  //   } else {
  //     const porelease = document.getElementById("release")
  //     porelease?.click()
  //   }
  // }

  releaseSelected() {
    console.log(this.attachment_name);
    console.log(this.Internal);
    console.log(this.suppldate);
    console.log(this.Comment);

    // Check if necessary conditions are met before processing
    if (this.POQty > 0 && this.poscheck === 1 && this.schedulepopAr.length > 0) {
      this.isCardVisible1 = true;
      this.devpo1();
      this.trailpo1();

      if (this.selectedRows.length > 0) {
        // Check for duplicate PR_Ref_No in released data
        const isDuplicate = this.releasedata.some(data =>
          this.selectedRows.some(row => row.PR_Ref_No === data.PR_Ref_No)
        );

        if (isDuplicate) {
          const alreadyexists = document.getElementById("alreayexisting");
          alreadyexists?.click();
          return;
        }

        // Check if rows have already been released
        if (this.isAlreadyReleased) {
          const releasedaction = document.getElementById("releasedaction");
          releasedaction?.click();
          return;
        }

        // Process selected rows for release
        for (const row of this.selectedRows) {
          this.internal = this.schedDateSave || this.Internal;

          this.releasedata.push({
            // pono: this.temppono,
            // rawmatid: this.rawMatlId,
            // prid: this.prid,
            // internal: this.internal,
            // suppdate: this.suppldate,
            // qty: '1',
            PR_Ref_No: row.PR_Ref_No
          });
        }
        // Call the service to release data
        // this.service.release(this.releasedata).subscribe(
        //   (result: any) => {
        //     const relstatus1 = document.getElementById("releasedstatus");
        //     relstatus1?.click();
        //     console.log("Release successful");
        //   }
        // );
        this.isAlreadyReleased = true;
      } else {
        // No rows selected, show the selection modal
        const selrows = document.getElementById("firstrelease");
        selrows?.click();
      }
    } else {
      // Show release-related modal if conditions are not met
      const porelease = document.getElementById("firstrelease");
      porelease?.click();
    }
  }
  savedataArray: any[] = []
  save2ProArray: any[] = []
  save3ProArray: any[] = []
  save4ProArray: any[] = []
  internal: string = ''

  async save() {
    if (this.POQty) {
      this.savedata = [];
      this.selectedRows.forEach(row => {
        const value = this.POQty * this.restrict;
        const taxablevalue = value + this.packing + this.freight;
        console.log(this.PoNO)
        for (let i = 0; i < this.selectedRows.length; i++) {
          this.save2ProArray.push({
            POdate: this.podate,
            rawmatlid: this.POMainTableArray[i]?.rawmatid ?? 0,
            rate: this.POMainTableArray[0]?.Rate ?? 0,
            Ord_Qty: this.maintable3[0]?.qty2 ?? 0,
            Discount: this.POMainTableArray1[0]?.discount ?? 0,
            Pack: this.maintablepoQtyArray[0]?.PackQty ?? 0,
            TaxPer: this.taxgroupidArray[0]?.taxper ?? 0,
            UOM: this.POMainTableArray[0]?.uom ?? '',
            StockUOM: this.POMainTableArray[0]?.uom ?? 0,
            PostingAccountId: this.maintable3[0]?.PostingAccountId ?? 0,
            pricelistdetailid: this.POMainTableArray1[0]?.pricelistdetailid ?? 0,
            GrossRate: this.value,
            TaxGroupId: this.POMainTableTaxArray1[0]?.taxgroupid ?? 0,
            Stock_Qty: this.maintable3[0]?.Stock_Qty ?? 0,
            freightInclude: this.POMainTableArray1[0]?.freight_incl ?? '',
            transporterId: this.POMainTableArray1[0]?.transporterid ?? 0,
          })
        }
        console.log(this.save2ProArray, "this.save2ProArray")
        for (let i = 0; i < this.quantityAr.length; i++) {

          if (this.schedDateSave) {
            this.internal = this.schedDateSave
            console.log(this.internal, "this.internal")
          }
          else {
            this.internal = this.Internal
          }
          this.save3ProArray.push({
            pono: this.PoNO,
            EntryEmpId: this.Empid,
            rawmatlid: this.POMainTableArray[0].rawmatid,
            prid: this.POMainTableArray[0]?.prid ?? 0,
            Quantity: this.quantityAr[i].Qty,
            DeliverySchedule: this.internal,
            OriginalDate: this.internal,
            InternalSchedule: this.internal,
            // Stock_Qty: this.maintable3[0]?.Stock_Qty ?? 0,
            // temppoproid: Number(this.temppopro)
          })
        }
        console.log(this.save3ProArray, " this.save3ProArray")
        for (let i = 0; i < this.selectedRows.length; i++) {
          this.save4ProArray.push({
            TaxID: this.TaxArray[0]?.taxid ?? 0,
            Priority: this.POMainTableTaxArray1[0]?.Priority ?? 0,
            DefaultTaxValue: this.TaxArray[0]?.DefaultValue ?? 0,
            Amount_338: this.value,
            TaxableAmount_338: taxablevalue,
            PostingAccountId: this.maintable3[0]?.PostingAccountId ?? 0,
            Rate1: this.addValueArray[0]?.Rate ?? '',
            modeoftransport: this.addValueArray[0]?.["Mode of Transport"] ?? '',
            InsuranceTerms: this.addValueArray[0]?.["Insurance Terms"] ?? '',
            termid: this.POMainTableArray1[0]?.paytermid ?? 0,
            term: this.paymentDetailsArray[0]?.term ?? 0,
            percentage: this.paymentDetailsArray[0]?.perc ?? 0,
            advance: this.paymentDetailsArray[0]?.advance ?? 0,
            detail: this.paymentDetailsArray[0]?.detail ?? 0,
            amount: this.value,
            prid: this.POMainTableArray[0]?.prid ?? 0,
            Stock_Qty: this.maintable3[0]?.Stock_Qty ?? 0
          })
        }
        console.log(this.save4ProArray, "save4ProArray")
        this.savedata.push({
          temppono: this.temppono,
          pono: this.PoNO,
          supid: this.SupplierId,
          POdate: this.podate,
          Paytermid: this.POMainTableArray1[0]?.paytermid ?? 0,
          comment: this.Comment,
          GTotal: this.value,
          devpo: this.devpo,
          trailpo: this.trailpo,
          Validtill: this.validupto,
          CreditPeriod: this.GetCreditPerCurrTyArray[0]?.creditperiod ?? 0,
          currid: this.GetSupplierNameArray[0]?.currid ?? 0,
          attachment: this.attachment_name,
          exrate: this.GetCurrtypeExchRateArray[0]?.exrate ?? 0,
          totalpovalue: this.value,
          EntryEmpId: this.Empid,
          EntryDateTime: this.entrydateTime,
          POprTypeId: this.GetPurchaseTypeArray[0]?.TypeID ?? 0,
          freightInc: this.POMainTableArray1[0]?.freight_incl ?? 0,
          transporterId: this.POMainTableArray1[0]?.transporterid ?? 0,
          LocationId: this.LocationId,
          suppliername: this.SupplierName,
          save2pro: this.save2ProArray,
          save3pro: this.save3ProArray,
          save4pro: this.save4ProArray
        });
      })
      console.log(this.savedata)
      await this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);
      this.service.save(this.savedata).subscribe(
        (result: any) => {
          this.savedataArray = result;
          console.log(this.savedataArray);
          // const saved = document.getElementById("savedpop")
          // saved?.click()
          this.clear()
          const saved = document.getElementById("eror")
          saved?.click()
        },
        (error) => console.error("Error occurred during save", error)
      );
    } else {
      const selrows = document.getElementById("firstrelease");
      selrows?.click();
    }
  }
  private openDatabase() {
    const request = indexedDB.open(this.dbName, this.dbVersion);
    request.onupgradeneeded = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.db.createObjectStore('files', { keyPath: 'id' }); // Object store for files with keyPath 'id'
    };
    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.loadFileList();  // Load the list of files when the database is successfully opened
    };
    request.onerror = (event) => {
      console.error('Database error:', (event.target as IDBOpenDBRequest).error);
    };
  }
  private loadFileList() {
    if (!this.db) return;
    const transaction = this.db.transaction(['files'], 'readonly');
    const objectStore = transaction.objectStore('files');
    const fileSelect = this.fileSelect.nativeElement;
    fileSelect.innerHTML = '<option value="" disabled selected>Select a file</option>'; // Reset dropdown
    const request = objectStore.openCursor();
    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        const option = document.createElement('option');
        option.value = cursor.value.id;
        option.text = cursor.value.id;
        fileSelect.appendChild(option);
        cursor.continue();
      }
    };
  }
  private fileToArrayBuffer(file: File, callback: (arrayBuffer: ArrayBuffer) => void) {
    const reader = new FileReader();
    reader.onload = (event) => {
      callback(event.target?.result as ArrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  }
  uploadFile() {
    const fileInput = this.attachmentInput.nativeElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.fileToArrayBuffer(file, (arrayBuffer) => {
        if (!this.db) return;
        const transaction = this.db.transaction(['files'], 'readwrite');
        const objectStore = transaction.objectStore('files');
        const fileData = {
          id: file.name,
          type: file.type,
          data: arrayBuffer,
          size: file.size
        };
        const request = objectStore.put(fileData);
        request.onsuccess = () => {
          const fileupload = document.getElementById("uploaded")
          fileupload?.click()
          this.loadFileList();
        };
        request.onerror = (event) => {
          console.error('Transaction error:', (event.target as IDBRequest).error);
        };
      });
    } else {
      const unselected = document.getElementById("nofiles")
      unselected?.click()
    }
  }
  fetchFile() {
    const fileName = this.fileSelect.nativeElement.value;
    if (!fileName) {
      const dropdown = document.getElementById("dropfile")
      dropdown?.click()
      return;
    }
    if (!this.db) return;
    const transaction = this.db.transaction(['files'], 'readonly');
    const objectStore = transaction.objectStore('files');
    const request = objectStore.get(fileName);
    request.onsuccess = (event) => {
      const fileData = (event.target as IDBRequest<any>).result;
      if (fileData) {
        const blob = new Blob([fileData.data], { type: fileData.type });
        const url = URL.createObjectURL(blob);
        const imgElement = this.fileImage.nativeElement;
        const fileDetails = this.fileDetails.nativeElement;
        if (fileData.type.startsWith('image/')) {
          imgElement.src = url;
          imgElement.style.display = 'block';
        } else {
          imgElement.style.display = 'none';
        }
        fileDetails.innerHTML = `
          <strong>File Name:</strong> ${fileData.id} <br>
          <strong>File Type:</strong> ${fileData.type} <br>
          <strong>File Size:</strong> ${fileData.size} bytes <br>
          <a href="${url}" download="${fileData.id}">Download File</a>
        `;
        this.attachment_name = fileData.id
        console.log(this.attachment_name);
      } else {
        const index = document.getElementById("db")
        index?.click()
      }
    };
    request.onerror = (event) => {
      console.error('Request error:', (event.target as IDBRequest).error);
    }
  }
  isCheckboxChecked = false;
  onCheckboxChange1(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isCheckboxChecked = input.checked;
  }
  internaldate(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.Internal = input.value;
  }
  supplierdate(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.suppldate = input.value
  }
  POQtyschedule: number = 100;
  inputQty: number = 0;
  schedulepopAr: any[] = [];
  poscheck: number = 0;
  Commentsch: string = '';
  checkpoQty: number = 0
  pocheckqty: number = 0
  lastindex: any[] = []

  insert() {
    this.POQtyschedule = Number(this.POQtyschedule);
    this.inputQty = Number(this.inputQty)
    if (this.inputQty) {
      if (this.POQtyschedule > 0 && this.inputQty > 0 && this.inputQty <= this.POQtyschedule) {
        if (this.schedulepopAr.length > 0) {
          const lastSelectedDate = new Date(this.schedulepopAr[this.schedulepopAr.length - 1].internalCommitment);
          const newDate = new Date(this.Internal);
          if (newDate <= lastSelectedDate) {
            const toastElement = document.getElementById('internaldate');
            const toastInstance = new bootstrap.Toast(toastElement);
            toastInstance.show();
            return;
          }
          else {
            this.POQtyschedule -= this.inputQty;
            console.log(this.POQtyschedule, "thisposc");
            this.schedulepopAr.push({
              inputQty: this.inputQty,
              uom: this.UOM,
              internalCommitment: this.Internal,
              selected: false
            });
            this.inputQty = this.POQtyschedule;
          }
        }
        else {
          this.POQtyschedule -= this.inputQty;
          console.log(this.POQtyschedule, "thisposc");
          this.schedulepopAr.push({
            inputQty: this.inputQty,
            uom: this.UOM,
            internalCommitment: this.Internal,
            selected: false
          });
          this.inputQty = this.POQtyschedule;
        }
      }
      else {
        const toastElement = document.getElementById('liveToast');
        const toastInstance = new bootstrap.Toast(toastElement);
        toastInstance.show();
      }
    }
    else {
      const toastElement = document.getElementById('liveToast');
      const toastInstance = new bootstrap.Toast(toastElement);
      toastInstance.show();
    }
  }
  remove() {
    const selectedRows = this.schedulepopAr.filter(row => row.selected);
    if (selectedRows.length > 0) {
      selectedRows.forEach(row => {
        this.POQtyschedule += Number(row.inputQty);
        console.log(this.POQtyschedule);
      });
      this.schedulepopAr = this.schedulepopAr.filter(row => !row.selected);
      console.log(this.schedulepopAr);
    } else {
      console.log("No rows selected for removal.");
      const toastElement = document.getElementById('nothing');
      const toastInstance = new bootstrap.Toast(toastElement);
      toastInstance.show();
    }
  }
  orderquantity: number = 0
  selectedIndex1: number | null = null;
  selectedIdx: number = -1;
  PODetails(index: number) {
    if (this.POQty > 0) {
      this.pocheckqty = Number(this.POQty)
      // this.schedulepopAr = []
      this.inputQty = 0
      this.POQtyschedule = 0
      this.POQtyschedule = Number(this.POQty)
      this.orderquantity = Number(this.POQty)
      this.POQty = Number(this.POQty)
      const PODetail = document.getElementById("POSchedule")
      PODetail?.click()
      this.selectedIdx = index
    }
    else {
      const poQty = document.getElementById("poqty")
      poQty?.click()
    }
  }
  deletepop() {
    this.poscheck = 0
    this.schedulepopAr = []
    this.poscheduledata = []
    this.inputQty = 0
    this.checkpoQty = 0
    this.lastindex = []
    this.Internal = this.today
    this.suppldate = this.today
    this.Commentsch = ''
    this.POQtyschedule = Number(this.POQty)
  }
  closepop() {
    // this.poscheck = 0
    // // this.schedulepopAr = []
    // // this.poscheduledata = []
    // // this.inputQty = 0
    // this.checkpoQty = 0
    // this.lastindex = []
    // // this.Internal = this.today
    // // this.suppldate = this.today
    // this.Commentsch = ''
    // this.POQtyschedule = Number(this.POQty)
  }
  download() {
    this.service.capex().subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Chandrakanth.xlsx'; // Specify your file name with extension
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading file:', error);
      }
    );
  }
  poscheduledata: any[] = []
  poscheduledataarr: any[] = []
  quantityAr: any[] = []
  poschedule() {
    this.internal = this.schedDateSave || this.Internal;
    if (this.schedulepopAr.length > 0) {
      this.poscheck = 1;
      for (let i = 0; i < this.schedulepopAr.length; i++) {
        this.poscheduledata.push({
          prid: this.prid,
          Qty: this.schedulepopAr[i].inputQty,
          internal: this.schedulepopAr[i].internalCommitment,
          supp_date: this.schedulepopAr[i].internalCommitment,
          rawmatid: this.rawMatlId,
          pono: this.temppono,
          comments: this.Commentsch
        });
      }
      for (let i = 0; i < this.schedulepopAr.length; i++) {
        this.quantityAr.push({
          Qty: this.schedulepopAr[i].inputQty
        });
      }
      console.log(this.quantityAr, "this.quantityAr");
      console.log(this.poscheduledata, "poscheduledata");
      this.service.release(this.poscheduledata).subscribe((result: any) => {
        this.selectedIndex1 = this.selectedIdx;
        this.poscheduledataarr = result;
        this.poscheduledata = [];
        this.orderquantity = 0;
        this.Commentsch = '';
        this.Internal = this.today;
        this.suppldate = this.today;
        this.POQtyschedule = 0;

        // Disable the button for the scheduled row
        if (this.selectedIdx >= 0 && this.selectedIdx < this.POMainTableArray.length) {
          this.POMainTableArray[this.selectedIdx].disabled = true;
          this.POMainTableArray[this.selectedIdx].scheduled = true; // Add red-row class
        }

        const kind = document.getElementById("kindly");
        kind?.click();
      });
    } else {
      const insert = document.getElementById('insert1');
      const toastInstance = new bootstrap.Toast(insert);
      toastInstance.show();
    }
  }


  savetoast() {
    const poschedule = document.getElementById('poschedule1');
    const po = new bootstrap.Toast(poschedule);
    po.show();
  }
}