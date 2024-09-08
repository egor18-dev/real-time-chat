import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

  public myGroup !: FormGroup; 

  constructor (private _authService : AuthService,
    private _formBuilder : FormBuilder,
    private _messageService : MessageService
  ) {
    this.myGroup = this._formBuilder.group({
      message: new FormControl("", [Validators.required])
    })
  }

  send(data : any) {
    const {message} = data;

    this._messageService.sendMessage(message);

    this.myGroup.reset();
  }

}
