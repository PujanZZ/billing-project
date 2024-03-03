import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';
declare var window: any;

@Component({
  selector: 'app-customer-manegement',
  templateUrl: './customer-manegement.component.html',
  styleUrls: ['./customer-manegement.component.css']
})
export class CustomerManegementComponent implements OnInit {

  customerDetails = [];
  customerFormGroup: FormGroup;

  customerAddEditModal: any;

  customerObj: any = {
    id: null,
    name: null,
    mobile: null,
    address: null,
  }

  constructor(public utilsService: UtilsService, private fb: FormBuilder) { 
    this.getCustomerDetails();
  }

  ngOnInit() {

    this.customerAddEditModal = new window.bootstrap.Modal(
      document.getElementById('customerAddEditModal')
    );

    this.customerForm();
  }

  customerForm() {
    this.customerFormGroup = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      mobile: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
    })
  }

  getCustomerDetails() {

    this.customerDetails = [];

    const param = {}

    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.CUS_LISTING, param, (response) =>{
      this.customerDetails = response;
      console.log(this.customerDetails);
    })
  }

  openAddEditModal(obj?) {
    this.customerObj = {};
    this.customerFormGroup.reset();

    if(obj) {

      setTimeout(() => {
        this.customerObj = {
          id: obj.id,
          name: obj.name,
          mobile: obj.mobile,
          address: obj.address,
        }
      }, 100);
    }
    this.customerAddEditModal.show();
  }

  onSaveCustomer() {

    if(this.customerFormGroup.invalid) {
      this.customerFormGroup.markAllAsTouched();
      return;
    }

    const param = {
      id: this.customerObj.id ? this.customerObj.id : null,
      name: this.customerObj.name,
      mobile: Number(this.customerObj.mobile),
      address: this.customerObj.address,
    }

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.CUS_ADD, param, (response) => {
      this.customerAddEditModal.hide();
      this.getCustomerDetails();
      setTimeout(() => {
        this.customerFormGroup.reset();
      }, 150);
    })
  }

}
