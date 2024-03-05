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

  quantityTotal: any;
  priceTotal: any;

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

    this.priceTotal = 0;
    this.quantityTotal = 0;
    this.billingDetails = [];

    const param = {
      cust_id: this.customerId
    }

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.BILLING_GET_METHOD, param, (res) => {
      this.billingDetails = res;
      
      let quantity = this.billingDetails[0].product.map(v => v.quantity)
      let price = this.billingDetails[0].product.map(v => v.Price)

      console.log(this.billingDetails[0].product);
      
      
      this.quantityTotal = quantity.reduce((a,i) => {
        return a + i
      }, 0)

      this.priceTotal = price.reduce((a,i) => {
        return a + i
      }, 0)
    })

  }

  onCustomerChange() {
    this.customerId = this.activeStatus
    this.getBillingDetails();
  }

  onDeleteProduct(item) {

    const param = {
      id: Number(this.activeStatus),
      pid: item.id,
    }

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.PRODUCT_DELETE, param, (res) => {
      this.getBillingDetails();
    })
  }
  
  //Modal 

  openAddProductModal() {
    this.productFormGroup.reset();
    this.addEditProductBilling.show();
  }

  onSave() {

    if(this.productFormGroup.invalid) {
      this.productFormGroup.markAllAsTouched();
      return;
    }

    const param = {
      cust_id: Number(this.activeStatus),
      product_name: this.productObj.product_name,
      price: this.productObj.price,
      cquantity: Number(this.productObj.quantity),
      tax: Number(this.productObj.tax)
    }

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.BILLING_POST, param, (res) => {
      this.getBillingDetails();
      this.addEditProductBilling.hide();
    })

  }

  onSaveBill() {

  }

}
