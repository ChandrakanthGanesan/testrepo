import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { InventoryMainModuleComponent } from './inventory-main-module/inventory-main-module.component';
import { PurchaseRequestComponent } from './purchase-request/purchase-request.component';
import { SetupComponent } from './setup/setup.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import { DatePipe, DecimalPipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DemoComponent } from './demo/demo.component';
import { ExamblesComponent } from './exambles/exambles.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { InputOtpModule } from 'primeng/inputotp';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastrModule } from 'ngx-toastr';
import { NavigationComponent } from './navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DirectIndentComponent } from './direct-indent/direct-indent.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { IssueRequestComponent } from './issue-request/issue-request.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { StoreIssueComponent } from './store-issue/store-issue.component'
import {MatTabsModule} from '@angular/material/tabs';
import { AdminComponent } from './admin/admin.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MaterialReturnFrmDeptComponent } from './material-Recived-frm-dept/material-return-frm-dept.component';
// import { DashboardCommericaComponent } from './dashboard-commerica/dashboard-commerica.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ReworkissueComponent } from './reworkissue/reworkissue.component';
import { DialogModule } from 'primeng/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StorageQtyAllocationComponent } from './storage-qty-allocation/storage-qty-allocation.component';
import { TooltipModule } from 'primeng/tooltip';
import { ShelfLifeBatchQtyComponent } from './shelf-life-batch-qty/shelf-life-batch-qty.component';
import { StoreToStoreMomentComponent } from './store-to-store-moment/store-to-store-moment.component';
import { StoreissuelogoutComponent } from './storeissuelogout/storeissuelogout.component';
import { IndentEntryComponent } from './indent-entry/indent-entry.component';
import { PurchaseMainModuleComponent } from './purchase-main-module/purchase-main-module.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NewPurchaseOrderComponent } from './new-purchase-order/new-purchase-order.component';
import { PoApprovalComponent } from './po-approval/po-approval.component';
import { PocloseComponent } from './poclose/poclose.component';
import { RejPOApprovalComponent } from './rej-poapproval/rej-poapproval.component';
import { CODApproveComponent } from './cod-approve/cod-approve.component';
import { CapitalporeviewComponent } from './capitalporeview/capitalporeview.component';
import { Poshortclose2levelComponent } from './poshortclose2level/poshortclose2level.component';
import { Poshortclose3levelComponent } from './poshortclose3level/poshortclose3level.component';
import { CreditdaysApprovalComponent } from './creditdays-approval/creditdays-approval.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    InventoryMainModuleComponent,
    PurchaseRequestComponent,
    SetupComponent,
    DemoComponent,
    ExamblesComponent,
    NavigationComponent,
    DirectIndentComponent,
    IssueRequestComponent,
    StoreIssueComponent,
    AdminComponent,
    MaterialReturnFrmDeptComponent,
    ReworkissueComponent,
    StorageQtyAllocationComponent,
    ShelfLifeBatchQtyComponent,
    StoreToStoreMomentComponent,
    StoreissuelogoutComponent,
    IndentEntryComponent,
    PurchaseMainModuleComponent,
    NewPurchaseOrderComponent,
    PoApprovalComponent,
    PocloseComponent,
    RejPOApprovalComponent,
    CODApproveComponent,
    CapitalporeviewComponent,
    Poshortclose2levelComponent,
    Poshortclose3levelComponent,
    CreditdaysApprovalComponent,
    // DashboardCommericaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates:true,
    }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,SplitButtonModule,
    MatToolbarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,MatSelectModule,
    FormsModule,ReactiveFormsModule,
    NgSelectModule,
    MatCheckboxModule,
    InputOtpModule,
    FieldsetModule,MatTooltipModule,DialogModule,NgxSpinnerModule,ConfirmDialogModule,TooltipModule,MatProgressSpinnerModule,
    TableModule,ContextMenuModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule,
    HttpClientModule,MatAutocompleteModule,MatTabsModule,NgMultiSelectDropDownModule,MatButtonToggleModule,MatProgressBarModule
  ],
  providers: [{ provide: LocationStrategy, useClass:HashLocationStrategy},DatePipe  ,DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
