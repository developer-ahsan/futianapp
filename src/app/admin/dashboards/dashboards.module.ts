import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductListComponent } from './components/warehouse/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './components/index/index.component';
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';
import { OurProfileComponent } from './components/our-profile/our-profile.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersManagementComponent } from './components/customers-management/customers-management.component';
import { HomeComponent } from './components/warehouse/home/home.component';


@NgModule({
  declarations: [DashboardComponent, IndexComponent, UsermanagementComponent, OurProfileComponent, CustomersManagementComponent, HomeComponent, ProductListComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule,
    NgxUiLoaderModule
  ]
})
export class DashboardsModule { }
