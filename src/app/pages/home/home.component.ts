import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  public myGroup !: FormGroup; 
  public messages : Message [] = [];
  public userId !: string;
  
  constructor (private _authService : AuthService,
    private _formBuilder : FormBuilder,
    private _messageService : MessageService,
  ) {
    this.myGroup = this._formBuilder.group({
      message: new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
    this.getActualId();
    this.getMessages();
  }

  async getActualId () {
    try{
      const actualId = await this._authService.getActualUserId();

      if(actualId !== null)
          this.userId = actualId.id;
    }catch(err) {console.log(err);}
  }

  async getMessages () {
    try{
      const data = await this._messageService.getMessages();

      if(data)
        this.messages = data;
      
    }catch(err) {}
  }

  send(data : any) {
    const {message} = data;

    this._messageService.sendMessage(message);

    this.myGroup.reset();
    this.getMessages();
  }

}
