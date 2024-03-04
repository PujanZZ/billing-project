import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';
declare var window: any;

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
  productFormGroup: FormGroup;

  productObj: any = {
    id: null,
    product_name: null,
    price: null,
    tax: null,
    discount: null,
    total: null,
  }

  addEditProductBilling: any;

  constructor(public utilsService: UtilsService, private fb: FormBuilder) { }

  ngOnInit() {

    this.addEditProductBilling = new window.bootstrap.Modal(
      document.getElementById('addEditProductBilling')
    );

    this.getCustomerDetails();
    this.productForm();
  }

  productForm() {
    this.productFormGroup = this.fb.group({
      product_name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      quantity: ['', Validators.compose([Validators.required])],
      tax: ['', Validators.compose([Validators.required])],
    })
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
  
  //Modal 

  openAddProductModal() {
    this.productFormGroup.reset();
    this.addEditProductBilling.show();
  }

  onSave() {

    const param = {
      id: Number(this.activeStatus),
      product_name: this.productObj.product_name,
      price: this.productObj.price,
      quantity: Number(this.productObj.quantity),
      tax: Number(this.productObj.tax)
    }

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.BILLING_ADD_METHOD, param, (res) => {
      this.getBillingDetails();
    })

  }

}
