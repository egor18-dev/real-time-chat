import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  public formGroup !: FormGroup;

  constructor (private _formBuilder : FormBuilder,
    private _authService : AuthService
  ) {
    this.formGroup = this._formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    });
  }

  createAccount (formData : any) {
    this._authService.createAcount(formData.username,formData.password);
  }

}
