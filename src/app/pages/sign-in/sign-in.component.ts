import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  public formGroup !: FormGroup;

  constructor (private _formBuilder : FormBuilder,
    private _authService : AuthService
  ) {
    this.formGroup = this._formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  async createAccount (formData : any) {
    const data = await this._authService.signIn(formData.username,formData.password);
    console.log(data);
  }

}
