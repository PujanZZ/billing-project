import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
declare var window: any;

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  p: number = 1;
  itemsPerPage: any = 10;

  salesListing: any[] = [];
  demoItems = [];
  activeStatus: any;

  billSalesModal: any;
  selectedCustomer: any;
  

  constructor(public utilsService: UtilsService) { }

  ngOnInit() {

    this.billSalesModal = new window.bootstrap.Modal(
      document.getElementById('billSalesModal')
    );

    this.getCustomerDetails();
    this.getSalesListing();
  }

  getCustomerDetails() {

    this.demoItems = [];

    const param = {
      name: null
    }

    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.CUS_LISTING_SALES, param, (response) => {
      this.demoItems = response;
    })
  }

  getSalesListing() {

    this.salesListing = [];

    const param = {
      cust_id: Number(this.activeStatus),
    }

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.SALES_LISTING, param, (response) => {
      this.salesListing = response;
      this.salesListing = this.salesListing.map(v => ({ ...v, product: JSON.parse(v.product) }));
    })

  }
  

  openProductModal(item) {
    this.selectedCustomer = item;
    this.billSalesModal.show();
  }

  onCustomerChange() {
    this.getSalesListing();
  }

}
