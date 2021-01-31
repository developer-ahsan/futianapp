import { ProductListComponent } from './components/warehouse/product-list/product-list.component';
import { HomeComponent } from './components/warehouse/home/home.component';
import { CustomersManagementComponent } from './components/customers-management/customers-management.component';
import { OurProfileComponent } from './components/our-profile/our-profile.component';
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  {
      path: '',
      component: DashboardComponent,
      children: [
          { path: '', component: IndexComponent, data: { title: ':: Aero Angular :: Dashboard ::' }},
          { path: 'userManagement', component: UsermanagementComponent},
          { path: 'customersManagement', component: CustomersManagementComponent},
          { path: 'ourProfile', component: OurProfileComponent},
          // Warehouse
          { path: 'home', component: HomeComponent},
          { path: 'products', component: ProductListComponent},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
