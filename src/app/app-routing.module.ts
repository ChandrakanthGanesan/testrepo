import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryMainModuleComponent } from './inventory-main-module/inventory-main-module.component';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { SetupComponent } from './setup/setup.component';
import { DemoComponent } from './demo/demo.component';
import { ExamblesComponent } from './exambles/exambles.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DirectIndentComponent } from './direct-indent/direct-indent.component';
import { IssueRequestComponent } from './issue-request/issue-request.component';
import { StoreIssueComponent } from './store-issue/store-issue.component';
import { AdminComponent } from './admin/admin.component';
import { MaterialReturnFrmDeptComponent } from './material-Recived-frm-dept/material-return-frm-dept.component';
import { ReworkissueComponent } from './reworkissue/reworkissue.component';
import { StorageQtyAllocationComponent } from './storage-qty-allocation/storage-qty-allocation.component';
import { ShelfLifeBatchQtyComponent } from './shelf-life-batch-qty/shelf-life-batch-qty.component';
import { StoreToStoreMomentComponent } from './store-to-store-moment/store-to-store-moment.component';
import { StoreissuelogoutComponent } from './storeissuelogout/storeissuelogout.component';
import { IndentEntryComponent } from './indent-entry/indent-entry.component';
import { PurchaseMainModuleComponent } from './purchase-main-module/purchase-main-module.component';
import { NewPurchaseOrderComponent } from './new-purchase-order/new-purchase-order.component';
import { PoApprovalComponent } from './po-approval/po-approval.component';
import { PocloseComponent } from './poclose/poclose.component';
import { RejPOApprovalComponent } from './rej-poapproval/rej-poapproval.component';
import { CODApproveComponent } from './cod-approve/cod-approve.component';
import { CapitalporeviewComponent } from './capitalporeview/capitalporeview.component';
import { Poshortclose2levelComponent } from './poshortclose2level/poshortclose2level.component';
import { Poshortclose3levelComponent } from './poshortclose3level/poshortclose3level.component';
import { CreditdaysApprovalComponent } from './creditdays-approval/creditdays-approval.component';

// import { DashboardCommericaComponent } from './dashboard-commerica/dashboard-commerica.component';

const routes: Routes = [
  // -----------------------Home-----------------
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'examble', component: ExamblesComponent },
  { path: 'nav', component: NavigationComponent },
  // ----------------------DashBoard--------------------------
  { path: 'Inventory', component: InventoryMainModuleComponent },
  { path: 'Purchase', component: PurchaseMainModuleComponent },

  // ---------------------Inventory---------------------------
  { path: 'PurchaseReq', component: PurchaseRequestComponent },
  { path: 'issueReq', component: IssueRequestComponent },
  { path: 'directIndent', component: DirectIndentComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'storeissue', component: StoreIssueComponent },
  { path: 'reworkissue', component: ReworkissueComponent },
  { path: 'MatlReceiveFrmDept', component: MaterialReturnFrmDeptComponent },
  { path: 'StorageQtyAlloc', component: StorageQtyAllocationComponent },
  { path: 'Shelflife', component: ShelfLifeBatchQtyComponent },
  { path: 'StoretoStore', component: StoreToStoreMomentComponent },
  { path: 'Storelogout', component: StoreissuelogoutComponent },


  // ---------------------------Inventory End --------------------------

  // ---------------------------Purchase------------------------------
  { path: 'IndentEntry', component: IndentEntryComponent },
  { path: 'rejPOApproval', component: RejPOApprovalComponent },
  { path: 'COD_Approve', component: CODApproveComponent },
  { path: 'newpurchaseorder', component: NewPurchaseOrderComponent },
  { path: 'poapproval', component: PoApprovalComponent },
  { path: 'poclose', component: PocloseComponent },
  { path: 'capitalporeview', component: CapitalporeviewComponent },
  { path: 'poshortclose2level', component: Poshortclose2levelComponent },
  { path: 'poshortclose3level', component: Poshortclose3levelComponent },
  { path: 'creditdaysapproval', component: CreditdaysApprovalComponent },
  //  ----------->>>>>>>>>>Admin<<<<<<-------------
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
