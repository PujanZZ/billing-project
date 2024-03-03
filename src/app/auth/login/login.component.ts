import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  constructor(public utilsService: UtilsService, private fb: FormBuilder) { 

  }

  ngOnInit() {
    this.loginForm();
  }

  loginForm() {

    this.loginFormGroup = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    })

  }

  onLogin() {

    if(this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
      return;
    }

    const value = this.loginFormGroup.value

    const param = {
      username: value.username,
      password: value.password
    }

    this.utilsService.postMethodAPI(true, this.utilsService.serverVariableService.LOGIN_API, param, (response) => {
      const loginResponse = response;
      this.setLocalStorage(loginResponse, loginResponse.token).then(() => {
        this.utilsService.redirectTo('/admin/customer-management');
      })
    })  

  }

  setLocalStorage(loginResponse, token) {

    const promise = new Promise((resolve, reject) => {
      try {
        this.utilsService.username = `${loginResponse.username}`;
        this.utilsService.userProfilePicture = loginResponse.profile_pic_url;
        this.utilsService.storeDataLocally('userData', JSON.stringify(loginResponse));
        this.utilsService.storeDataLocally('token', token);
        resolve('Success')
      }
      catch {
        reject()
      }
    });

    return promise;
  }
}
