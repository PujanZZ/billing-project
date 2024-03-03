import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerVariableService {

  PATH_FOR_API = '';

  // AUTH
  LOGIN_API = this.PATH_FOR_API + '';
  REGISTRATION_API = this.PATH_FOR_API + '';

  //REFRESH TOKEN
  REFRESH_TOKEN = this.PATH_FOR_API + '';

  //Product Listing
  PRODUCT_LISTING = this.PATH_FOR_API + 'https://madhavoverseas.co.in/my.testing.com/pdc_get.php';
  ADD_PRODUCT = this.PATH_FOR_API + 'https://madhavoverseas.co.in/my.testing.com/pdc_edit.php';
  DELETE_PRODUCT = this.PATH_FOR_API + 'https://madhavoverseas.co.in/my.testing.com/pdc_del.php';
  PRODUCT_EDIT = this.PATH_FOR_API + 'https://madhavoverseas.co.in/my.testing.com/pdc_updt.php'

  //Customer 
  CUS_LISTING = this.PATH_FOR_API + 'https://madhavoverseas.co.in/my.testing.com/customer.php';
  CUS_ADD = this.PATH_FOR_API + 'https://madhavoverseas.co.in/my.testing.com/customer_post.php';
}
