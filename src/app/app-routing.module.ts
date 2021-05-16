import { ItemComponent } from './item/item.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {AppComponent} from './app.component';
import {SidemenuComponent} from './sidemenu/sidemenu.component';
import {CustomerComponent} from './customer/customer.component';
import {EmployeeComponent} from './employee/employee.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {CalenderComponent} from './calender/calender.component';
import {SupplierComponent} from './supplier/supplier.component';
import {PurchaseComponent} from './purchase/purchase.component';
import {VouchersComponent} from './vouchers/vouchers.component';
import {ReportComponent} from './report/report.component';
import {CategoryComponent} from './category/category.component';
import {SubCategoryComponent} from './sub-category/sub-category.component';
import {ServiceComponent} from './service/service.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {NotFoundErrorComponent} from "./error/not-found-error/not-found-error.component";
import {HomeComponent} from "./home/home.component";
import {ApproveAppointmentComponent} from "./approve-appointment/approve-appointment.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UnauthorizedErrorComponent} from "./error/unauthorized-error/unauthorized-error.component";
import {HeaderComponent} from "./header/header.component";
import {GrnComponent} from "./grn/grn.component";
import {InvoiceComponent} from "./invoice/invoice.component";
import {InvoiceReportComponent} from "./invoice-report/invoice-report.component";

const routes: Routes = [
  {path: 'unauthorized', component: UnauthorizedErrorComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HeaderComponent, children: [
  {path: '', component: HomeComponent},
      {path: 'customer-reg', component: CustomerComponent},
      {path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard], data: {roles: ['Owner', 'Cashier', 'Customer']}}
  ]},
  {
    path: 'admin', component: SidemenuComponent, canActivate: [AuthGuard], data: {roles: ['Owner', 'Cashier']}, children: [
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {roles: ['Owner', 'Cashier']}},
      {path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard], data: {roles: ['Owner']}},
      {path: 'customer', component: CustomerComponent, canActivate: [AuthGuard], data: {roles: ['Owner', 'Cashier']}},
      {path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard], data: {roles: ['Owner', 'Cashier']}},
      {path: 'calender', component: CalenderComponent, canActivate: [AuthGuard], data: {roles: ['Owner', 'Cashier']}},
      {path: 'supplier', component: SupplierComponent, canActivate: [AuthGuard], data: {roles: ['Owner']}},
      {path: 'order', component: PurchaseComponent, canActivate: [AuthGuard], data: {roles: ['Owner', 'Cashier']}},
      {path: 'grn', component: GrnComponent, canActivate: [AuthGuard], data: {roles: ['Owner', 'Cashier']}},
      {path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard], data: {roles: ['Owner', 'Cashier']}},
      {path: 'appointment-report', component: ReportComponent, canActivate: [AuthGuard], data: {roles: ['Owner']}},
      {path: 'invoice-report', component: InvoiceReportComponent, canActivate: [AuthGuard], data: {roles: ['Owner']}},
      {path: 'category', component: CategoryComponent, canActivate: [AuthGuard], data: {roles: ['Owner']}},
      {path: 'subCategory', component: SubCategoryComponent, canActivate: [AuthGuard], data: {roles: ['Owner']}},
      {path: 'service', component: ServiceComponent, canActivate: [AuthGuard], data: {roles: ['Owner']}},
      {path: 'item', component: ItemComponent, canActivate: [AuthGuard], data: {roles: ['Owner']}},
      {path: 'user', component: UserComponent, canActivate: [AuthGuard], data: {roles: ['Owner']}},
      {path: 'approve-appointment', component: ApproveAppointmentComponent, canActivate: [AuthGuard], data: {roles: ['Owner']}},
    ],
  },
  {path: '**', component: NotFoundErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
