import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customerCounter: any;
  todayOrder: any;
  productCounter: any;

  constructor(public utilsService: UtilsService) { }

  ngOnInit() {
    this.getCounter();
  }

  getCounter() {

    const param = {}

    this.utilsService.getMethodAPI(false, this.utilsService.serverVariableService.DASHBOARD_COUNTER, param, (res) => {
        this.customerCounter = res.c_counter;
        this.productCounter = res.products;
        this.todayOrder = res.orders;
    })

  }

}
