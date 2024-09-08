import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { first, firstValueFrom } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _URL_DIRECTION : string = 'http://localhost:3000/messages';

  constructor(private _authService : AuthService,
    private _httpCient : HttpClient) { }

  async sendMessage (message : string) {
    const sendMessage : Message = {
      message: message
    };

    try{
      const result = await firstValueFrom(this._httpCient.post<Message>(`${this._URL_DIRECTION}/create`, sendMessage, {withCredentials: true}));
    }catch(err){
      console.log(err);
    }
  
  }

  async getMessages () : Promise<any> {
    try{
      return await firstValueFrom(this._httpCient.get<Message>(`${this._URL_DIRECTION}/`));
    }catch(err) {
      return null;
    }

  }
}

