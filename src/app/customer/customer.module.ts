import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CustomerManegementComponent } from './customer-manegement/customer-manegement.component';
import { ProductComponent } from './product/product.component';
import { BillingGenerationComponent } from './billing-generation/billing-generation.component';

/** Customer Child Routes*/
const routes: Routes = [
  { path: '', component: CustomerComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'customer-management', component: CustomerManegementComponent },
    { path: 'products', component: ProductComponent },
    { path: 'billing', component: BillingGenerationComponent },
  ]
}
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerComponent, DashboardComponent, CustomerManegementComponent, ProductComponent, BillingGenerationComponent]
})
export class CustomerModule { }
