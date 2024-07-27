import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReworkissueService {

  constructor(private http: HttpClient) { }
  Issuepath(LocationId:any,Currdate:any){
    return this.http.get('http://192.168.203.59:3000/Indent/Rework-issuepath?LocationId='+LocationId+'&Currdate='+Currdate);
  }
  Issueno(Issuepath:any){
    return this.http.get('http://192.168.203.59:3000/Indent/Rework-IssueNo?Issuepath='+Issuepath)
  }
  Dept(LocationId:any){
    return this.http.get('http://192.168.203.59:3000/Indent/StoreIssue-Department?LocationId='+LocationId);
  }
  RefNo(LocationId:any,Currdate:any,Deptid:any,Frmdate:any,Todate:any){
    return this.http.get('http://192.168.203.59:3000/Indent/Rework-Refno?LocationId='+LocationId+'&Currdate='+Currdate+'&Deptid='+Deptid+'&Frmdate='+Frmdate+'&Todate='+Todate)
  }
  Material(Locationid:any,Deptid:any,Fromdate:any,Todate:any,SrRefNo:any){
    return this.http.get('http://192.168.203.59:3000/Indent/StoreIssue-Material?Locationid='+Locationid+'&Deptid='+Deptid+'&Fromdate='+Fromdate+'&Todate='+Todate+'&SrRefNo='+SrRefNo)
  }
  View(LocationId:any,CurrDate:any,Deptid:any,SRNO:any,Rawmatid:any,Frmdate:any,TOdate:any){
    return this.http.get('http://192.168.203.59:3000/Indent/Rework-ViewDet?LocationId='+LocationId+'&CurrDate='+CurrDate+'&Deptid='+Deptid+'&SRNO='+SRNO+'&Rawmatid='+Rawmatid+'&Frmdate='+Frmdate+'&TOdate='+TOdate)
  }
  Warehouse(LocationId:any){
    return this.http.get('http://192.168.203.59:3000/Indent/Rework-Warehouse?LocationId='+LocationId)
  }
  Stock_grnid(LocationId:any,Rawmatid:any){
    return this.http.get('http://192.168.203.59:3000/Indent/Rework-stockgrnid?LocationId='+LocationId+'&Rawmatid='+Rawmatid)
  }
  UpdateGrnid(Grnid:any){
    return this.http.get('http://192.168.203.59:3000/Indent/SubconInwardQtyUpdate?Grnid='+Grnid)
  }
  issuedetalis(ReworkIssueWarehouseValue:any,Rawmatid:any,LocationId:any){
      return this.http.get('http://192.168.203.59:3000/Indent/Rework-checkstock?ReworkIssueWarehouseValue='+ReworkIssueWarehouseValue+'&Rawmatid='+Rawmatid+'&LocationId='+LocationId)
  }
}
