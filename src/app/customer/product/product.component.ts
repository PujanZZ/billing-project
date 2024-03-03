import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';
declare var window: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productDetails = [];
  selectedProduct: any;

  productFormGroup: FormGroup
  addEditModalProduct: any;

  productObj: any = {
    id: null,
    product_name: null,
    price: null,
    tax: null,
  }

  constructor(public utilsService: UtilsService, private fb: FormBuilder) { 
    this.getProductDetails();
  }

  ngOnInit() {

    this.addEditModalProduct = new window.bootstrap.Modal(
      document.getElementById('addEditModalProduct')
    );

    this.productForm();
  }

  getProductDetails() {

    this.productDetails = [];

    const param = {}

    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.PRODUCT_LISTING, param, (response) =>{
      this.productDetails = response;
      console.log(this.productDetails);
    })

    

  }

  productForm() {
    this.productFormGroup = this.fb.group({
      product_name: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      tax: ['', Validators.compose([Validators.required])],
    })
  }

  openAddEditModal(obj) {
    this.productObj = {};
    this.productFormGroup.reset();

    this.productObj.tax = 0;
    
    if(obj) {

      setTimeout(() => {        
        this.productObj = {
          id: obj.id,
          product_name: obj.name,
          price: obj.price,
          tax: obj.tax,
        }
      }, 100);
    }

    this.addEditModalProduct.show();
  }

  onSaveUpdate() {

    if(this.productFormGroup.invalid) {
      this.productFormGroup.markAllAsTouched();
      return;
    }

    const param = {
      id: this.productObj.id ? Number(this.productObj.id) : null,
      name: this.productObj.product_name,
      price: Number(this.productObj.price),
      tax: Number(this.productObj.tax),
    }

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.ADD_PRODUCT, param, (response) => {
      this.addEditModalProduct.hide();
      this.getProductDetails();
      setTimeout(() => {
        this.productFormGroup.reset();
      }, 150);
    })


  }

  onDeleteProduct(item) {
    const param = {
      id: item.id
    }

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.DELETE_PRODUCT, param, (response) => {
      this.getProductDetails();
    })
  }

}
