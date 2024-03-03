import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  

  constructor(public utilsService: UtilsService) {
  }

  ngOnInit() {
  }

}
