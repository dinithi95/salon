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

const routes: Routes = [
  {
    path: '', component: SidemenuComponent, children: [
      {path: 'user', component: UserComponent},
      {path: 'employee', component: EmployeeComponent},
      {path: 'customer', component: CustomerComponent},
      {path: 'appointment', component: AppointmentComponent},
      {path: 'calender', component: CalenderComponent},
      {path: 'supplier', component: SupplierComponent},
      {path: 'order', component: PurchaseComponent},
      {path: 'voucher', component: VouchersComponent},
      {path: 'report', component: ReportComponent},
      {path: 'category', component: CategoryComponent},
      {path: 'subCategory', component: SubCategoryComponent},
      {path: 'service', component: ServiceComponent},

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
