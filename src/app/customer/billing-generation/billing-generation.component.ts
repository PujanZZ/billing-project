import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as printJS from 'print-js';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare var window: any;

@Component({
  selector: 'app-billing-generation',
  templateUrl: './billing-generation.component.html',
  styleUrls: ['./billing-generation.component.css']
})
export class BillingGenerationComponent implements OnInit {

  formattedDate: string;

  activeStatus: any;
  demoItems = [];

  billingDetails: any = [];

  productLising = [];
  selectedProduct: any;

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

  showPrintButton: boolean = false;

  constructor(public utilsService: UtilsService, private fb: FormBuilder, private datePipe: DatePipe) {
    const date = new Date();
    this.formattedDate = this.datePipe.transform(date, 'dd MMM yyyy');
  }

  ngOnInit() {

    this.addEditProductBilling = new window.bootstrap.Modal(
      document.getElementById('addEditProductBilling')
    );

    this.getCustomerDetails();
    this.productForm();
  }

  productForm() {
    this.productFormGroup = this.fb.group({
      // product_name: ['', Validators.compose([Validators.required])],
      // price: ['', Validators.compose([Validators.required, Validators.min(0), Validators.pattern(this.utilsService.validationService.ONLY_NUMBERS)])],
      quantity: ['', Validators.compose([Validators.required, Validators.min(1), Validators.pattern(this.utilsService.validationService.ONLY_NUMBERS)])],
      // tax: ['', Validators.compose([Validators.required, Validators.min(0), Validators.pattern(this.utilsService.validationService.ONLY_NUMBERS_AND_DOT)])],
    })
  }

  getCustomerDetails() {

    this.demoItems = [];

    const param = {
      name: null
    }

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.CUS_LISTING, param, (response) => {
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

      this.billingDetails[0]?.product?.forEach(element => {
        element.total = element.total.toFixed(2)
      });

      let quantity = this.billingDetails[0]?.product?.map(v => v.quantity)
      let price = this.billingDetails[0]?.product?.map(v => v.Price)

      this.quantityTotal = quantity?.reduce((a, i) => {
        return a + i
      }, 0)

      this.priceTotal = price?.reduce((a, i) => {
        return a + i
      }, 0)



    })

  }

  onCustomerChange() {
    this.customerId = this.activeStatus
    this.showPrintButton = false;
    this.getBillingDetails();
    this.getProductListing();
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
    this.selectedProduct = null;
    this.productFormGroup.reset();
    this.addEditProductBilling.show();
  }

  onSave() {

    if (this.productFormGroup.invalid) {
      this.productFormGroup.markAllAsTouched();
      return;
    }

    if (this.utilsService.isEmptyObjectOrNullUndefined(this.selectedProduct)) {
      return;
    }


    const param = {
      cust_id: Number(this.activeStatus),
      product_name: this.selectedProduct.name,
      price: Number(this.selectedProduct.mrp),
      cquantity: Number(this.productObj.quantity),
      tax: Number(this.selectedProduct.tax)
    }

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.BILLING_POST2, param, (res) => {
      this.getBillingDetails();
      this.addEditProductBilling.hide();
    })

  }

  onSaveBill() {

    if (!this.validateInputs()) {
      this.utilsService.toasterService.error('Quantity should be greater than 0, discount cannot be negative, and discount cannot be more than 100.', '', {
        closeButton: true,
      });
      return;
    }

    const param = {
      cust_id: Number(this.activeStatus),
      bill_detail: this.billingDetails[0].product
    }

    this.utilsService.postMethodAPI(false, this.utilsService.serverVariableService.SAVE_BILL, param, (res) => {
      this.getBillingDetails();
      this.showPrintButton = true;
    })

  }

  validateInputs() {
    for (const item of this.billingDetails[0]?.product) {
      if (item.quantity <= 0 || item.quantity % 1 !== 0 || item.discount < 0 || item.discount > 100) {
        console.error("Quantity should be a positive integer, discount cannot be negative, and discount cannot be more than 100.");
        return false;
      }
    }
    return true;
  }

  // exportPDF() {

  //   console.log(this.billingDetails[0]);

  //   let address = this.billingDetails[0].address;
  //   let userDetails = {
  //     name: this.billingDetails[0].name,
  //     mobile: this.billingDetails[0].mobile,
  //     total_count: this.billingDetails[0].Total
  //   }

  //   const tableBody = this.billingDetails[0].product.map(item => [
  //     item.product_name,
  //     item.Price,
  //     item.quantity,
  //     item.discount,
  //     item.total
  // ]);


  // const docDefinition = {
  //   content: [
  //     { text: "Tables", style: "header" },
  //       "invoice",
  //     {
  //       text: "Customer Details: \n",
  //       style: "subheader"
  //     },
  //     {
  //       text: userDetails.name,
  //       style: "address"
  //     },
  //     {
  //       text: userDetails.mobile,
  //       style: "address"
  //     },
  //     {
  //       text: address,
  //       style: "address"
  //     },
  //     {
  //       style: "tableExample",
  //       table: {
  //         headerRows: 1,
  //         widths: [100, 100, 100, 100, '*'],
  //         body: [
  //           [{text: 'Product Name', style: 'tableHeader'}, {text: 'Price', style: 'tableHeader'},{text: 'Quantity', style: 'tableHeader'},{text: 'Discount', style: 'tableHeader'},{text: 'Total', style: 'tableHeader'}],
  //           ...tableBody
  //         ]
  //       }
  //     },
  //     {
  //       style: 'tableExample',
  //       table: {
  //         headerRows: 1,
  //         widths: [100, 100, 100, 100, '*'],
  //         body: [
  //           [{}, {}, {}, {text: 'Total Price:', colSpan: 0, style: 'tableHeader', alignment: 'left'}, { text: userDetails.total_count, style: 'tableHeader', alignment: 'right' }],
  //           ['', '', '', '', ''],
  //         ]
  //       },
  //       layout: 'noBorders'
  //     }

  //   ],

  //   styles: {
  //     tableHeader: {
  //       bold: true,
  //     },
  //     address: {
  //       fontSize: 12,
  //       bold: false,
  //     },
  //     header: {
  //       fontSize: 18,
  //       bold: true,
  //       margin: [0, 0, 0, 10],
  //     },
  //     subheader: {
  //       fontSize: 16,
  //       bold: true,
  //       margin: [0, 10, 0, 5],
  //     },
  //     tableExample: {
  //       margin: [5, 15, 5, 15],
  //     },
  //   },
  // };


  //   pdfMake.createPdf(docDefinition).download("test.pdf");
  // }

  printJS() {

    const tableBody = this.billingDetails[0].product;
    let userDetails = {
      name: this.billingDetails[0].name,
      mobile: this.billingDetails[0].mobile,
      total_count: this.billingDetails[0].Total,
      address: this.billingDetails[0].address,
      orders: this.billingDetails[0].orders
    }

    console.log(tableBody);

    printJS({
      printable: tableBody,
      properties: [
        { field: 'product_name', displayName: 'Product Name', alignment: 'right' },
        { field: 'Price', displayName: 'Price' },
        { field: 'quantity', displayName: 'Quantity' },
        { field: 'GST', displayName: 'Tax' },
        { field: 'discount', displayName: 'Discount' },
        { field: 'total', displayName: 'Total' },
      ],
      type: 'json',
      gridHeaderStyle: 'background-color: #f2f2f2; color: #333; font-weight: bold; border: 2px solid #ddd; padding: 8px;',
      gridStyle: 'border: 2px solid #ddd; padding: 8px;',
      documentTitle: 'Invoice',
      header:
        `
        <div class="container">
        <div class="row" style="margin-top: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; position: relative;">
            <div class="col-xs-12">
                <div class="invoice-title" style="text-align: center;">
                    <h2 style="margin: 0; color: #333;">Invoice</h2>
                    <h3 style="margin: 5px 0 0; color: #555;">Order # ${userDetails.orders}</h3>
                </div>
                <hr style="border-top: 1px solid #ccc; margin: 20px 0;">
                <div class="row">
                    <div class="col-xs-6">
                        <div style="font-size: 14px;">
                            <strong>Customer Details</strong><br>
                            <span style="display: block; margin-top: 10px; color: #555;"><b>${userDetails.name}</b></span>
                            <span style="display: block; margin-top: 5px; color: #555;">${userDetails.mobile}</span>
                            <span style="display: block; margin-top: 5px; color: #555;">${userDetails.address}</span>
                        </div>
                    </div>
                    <br/>
                    <div class="col-xs-6 text-right">
                        <div style="font-size: 14px;">
                            <strong>Order Date:</strong><br>
                            <span style="display: block; margin-top: 5px; color: #555;">${this.formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
            <img src="https://i.imgur.com/RVDDvKd.png" alt="Company Logo" style="max-width: 50px; height: auto; position: absolute; top: 20px; right: 20px; border-radius: 50%;">
        </div>
        <!-- Total Price Counter -->
        <div class="row" style="margin-top: 20px;">
            <div class="col-xs-12 text-right">
                <div class="total-price-box" style="background-color: #e3e3e3; padding: 10px; border-radius: 5px; text-align: center;">
                    <strong>Total Price:</strong> ${userDetails.total_count}
                </div>
            </div>
        </div>
    </div>
    
    `,
      style: 'margin-top: 200px',
    });


  }

  // Product Listing 

  getProductListing() {

    this.productLising = []

    const param = {
      name: null
    }

    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.PRODUCT_LISTING, param, (response) => {
      this.productLising = response;
      console.log(this.productLising);
    })

  }

  onProductChange(value) {
    this.selectedProduct = value
  }
}
