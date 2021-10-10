import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AuthActionTypes } from "@core/store/types/AuthActionTypes";
import { ILoginRequest } from "@core/interfaces";
import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginForm } from "../../auth/login/loginForm";
import { LoaderService } from "@core/common/services/loader.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  private login: ILoginRequest = {password: "", username: ""}

  constructor(private store: Store, private formBuilder: FormBuilder, private loader: LoaderService) {
  }

  onLoginClick() {

    this.loader.show();
    // TODO : used for simulation will be remove in production
    setTimeout(() => {
      this.loader.hide();
      this.store.dispatch({type: AuthActionTypes.LOADING_LOGIN, payload: this.loginForm.value})
    }, 500);


  }

  ngOnInit(): void {
    this.loginForm = LoginForm({model: this.login, formBuilder: this.formBuilder});
  }

}
