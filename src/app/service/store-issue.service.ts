import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreIssueService {

  constructor(private http: HttpClient) { }

  Issuenopath(LocationId:any){
    return this.http.get("http://103.21.76.94:6055/Indent/IndentNopath?LocationId="+LocationId)
  }
  StoteissueNo(Indentnnoapath:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-IndentNo?Indentnnoapath="+Indentnnoapath)
  }
  Department(LocationId:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-Department?LocationId="+LocationId)
  }
  Warehouse(LocationId:any){
    return this.http.get('http://103.21.76.94:6055/Indent/StoreIssue-Warehouse?LocationId='+LocationId)
  }
  Rawmaterial(Locationid:any,Deptid:any,Fromdate:any,Todate:any,SrRefNo:any){
    return this.http.get('http://103.21.76.94:6055/Indent/StoreIssue-Material?Locationid='+Locationid+'&Deptid='+Deptid+'&Fromdate='+Fromdate+
    '&Todate='+Todate+'&SrRefNo='+SrRefNo)
  }
  Refno(Locationid:any,Issuedate:any,Frmdate:any,Todate:any,Deptid:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssueRefno?Locationid="+Locationid+'&Issuedate='+Issuedate+'&Frmdate='+Frmdate+'&Todate='+Todate+'&Deptid='+Deptid)
  }
  IssueMaterialViewbtn(Locationid:any,Issuedate:any,WarehouseId:any,Deptid:any,Srno:any,Rawmatid:any,Frmdate:any,Todate:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-ViewMaterial?Locationid="+Locationid+'&Issuedate='+Issuedate+'&WarehouseId='+WarehouseId+
    '&Deptid='+Deptid+'&Srno='+Srno+'&Rawmatid='+Rawmatid+'&Frmdate='+Frmdate+'&Todate='+Todate )
  }
  StockDepands(CompanyName:any,Rawmatid:any,Locationid:any,Warehouseid:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-StockDepandsCompany?CompanyName="+CompanyName+'&Rawmatid='+Rawmatid+'&Locationid='+Locationid+'&Warehouseid='+Warehouseid)
  }
  IndentDet(LocationId:any,SRDate:any,RawMatId:any,DeptId:any){
    return  this.http.get('http://103.21.76.94:6055/Request/StoreIndentDetl?LocationId='+LocationId+'&SRDate='+SRDate+'&RawMatId='+RawMatId+'&DeptId='+DeptId)
    }
  GmRefNo(Warehouseno:any,Rawmatid:any,Locationid:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-GmRefNo?Warehouseno="+Warehouseno+'&Rawmatid='+Rawmatid+'&Locationid='+Locationid)
  }
  StockCheck(IssueQty:any,Rawmatid:any,Warehousevalue:any,GrnId:any,Locationid:any){
    return this.http.get("http://103.21.76.94:6055/Indent/StoreIssue-StockCheck?IssueQty="+IssueQty+'&Rawmatid='+Rawmatid+'&Warehousevalue='+Warehousevalue+'&GrnId='+GrnId+'&Locationid='+Locationid)
  }
  Batch(Grnid:any){
    return this.http.get("http://103.21.76.94:6055/Indent/Storeissue-Batchwise?Grnid="+Grnid)
  }
  Save(UpdateStoreIssue:any){
    return this.http.post('http://192.168.203.59.4000/Indent/Post_StoreIssue',UpdateStoreIssue)
  }
}
