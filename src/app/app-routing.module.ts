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
import { DashComponent } from './dash/dash.component';
import { ShelfLifeBatchQtyComponent } from './shelf-life-batch-qty/shelf-life-batch-qty.component';
import { StoreToStoreMomentComponent } from './store-to-store-moment/store-to-store-moment.component';
// import { DashboardCommericaComponent } from './dashboard-commerica/dashboard-commerica.component';

const routes: Routes = [
  // -----------------------Home-----------------
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'examble', component: ExamblesComponent },
  { path: 'nav', component: NavigationComponent },
  { path: 'dash', component:DashComponent },
  // ----------------------DashBoard--------------------------
  { path: 'Inventory', component: InventoryMainModuleComponent },

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
  //  ----------->>>>>>>>>>Admin<<<<<<-------------
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
