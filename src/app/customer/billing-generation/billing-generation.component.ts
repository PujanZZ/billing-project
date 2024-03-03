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

}
