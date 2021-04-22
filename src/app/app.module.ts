import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SidemenuComponent} from './sidemenu/sidemenu.component';
import {UserComponent} from './user/user.component';
import {EmployeeComponent} from './employee/employee.component';
import {CustomerComponent} from './customer/customer.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {CalenderComponent} from './calender/calender.component';
import {SupplierComponent} from './supplier/supplier.component';
import {PurchaseComponent} from './purchase/purchase.component';
import {VouchersComponent} from './vouchers/vouchers.component';
import {ReportComponent} from './report/report.component';
import {CategoryComponent} from './category/category.component';
import {SubCategoryComponent} from './sub-category/sub-category.component';
import {ServiceComponent} from './service/service.component';
import {LoginComponent} from './login/login.component';
import {TokenInterceptorService} from "./services/token-interceptor.service";
import { NotFoundErrorComponent } from './error/not-found-error/not-found-error.component';
import { HomeComponent } from './home/home.component';
import { StockComponent } from './stock/stock.component';
import { GrnComponent } from './grn/grn.component';
import { ItemComponent } from './item/item.component';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    UserComponent,
    EmployeeComponent,
    CustomerComponent,
    AppointmentComponent,
    CalenderComponent,
    SupplierComponent,
    PurchaseComponent,
    VouchersComponent,
    ReportComponent,
    CategoryComponent,
    SubCategoryComponent,
    ServiceComponent,
    LoginComponent,
    NotFoundErrorComponent,
    HomeComponent,
    StockComponent,
    GrnComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ],
  providers: [{provide: NZ_I18N, useValue: en_US},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
