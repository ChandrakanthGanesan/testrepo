import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatlRecivedfrmdeptService {
  constructor(private http: HttpClient) { }

  Trannopath(LocationId:any,Currdate:any){
    return this.http.get('http://103.21.76.94:6055/Indent/MatReturnFrmDept-path?LocationId='+LocationId+'&Currdate='+Currdate);
  }
  TranNo(TranNopath:any){
    return this.http.get('http://103.21.76.94:6055/Indent/MatReturnFrmDept-Trano?Tarnopath='+TranNopath)
  }
  Material(Deptid:any,LocationId:any){
    return this.http.get('http://103.21.76.94:6055/Indent/MatReturnFrmDept-Material?Deptid='+Deptid+'&LocationId='+LocationId)
  }
  Department(LocationId:any){
    return this.http.get('http://103.21.76.94:6055/Indent/StoreIssue-Department?LocationId='+LocationId)
  }
  ViewRecivedMaterial(LocationId:any,Rawmatid:any,Deptid:any){
    return this.http.get('http://103.21.76.94:6055/Indent/MatReturnFrmDept-ViewReturnMat?LocationId='+LocationId+'&Rawmatid='+Rawmatid+'&Deptid='+Deptid)
  }
}
