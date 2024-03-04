import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-billing-generation',
  templateUrl: './billing-generation.component.html',
  styleUrls: ['./billing-generation.component.css']
})
export class BillingGenerationComponent implements OnInit {

  activeStatus: any;
  demoItems = [];

  billingDetails: any = [];
  productLising = [];

  customerId: any;

  constructor(public utilsService: UtilsService) { }

  ngOnInit() {
    this.getCustomerDetails();
  }

  getCustomerDetails() {

    this.demoItems = [];

    const param = {}

    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.CUS_LISTING, param, (response) =>{
      this.demoItems = response;
      console.log(this.demoItems);
    })
  }

  getBillingDetails() {

    this.billingDetails = [];

    const param = {
      cust_id: this.customerId
    }

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.BILLING_GET_METHOD, param, (res) => {
      this.billingDetails = res;
      console.log(this.billingDetails);      
    })

  }

  onCustomerChange() {
    this.customerId = this.activeStatus
    this.getBillingDetails();
  }

}
