import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _URL_DIRECTION : string = 'http://localhost:3000/users';

  constructor(private _httpClient : HttpClient,
    private _router : Router
  ) { }

  async createAcount (username : string, password : string) {
    const user : User = {
      username: username,
      password: password
    }

    try{
      const result = await firstValueFrom(this._httpClient.post<User>(`${this._URL_DIRECTION}/create`, user, {withCredentials: true}));
      
      if(result){
        this._router.navigate(['/sign-in']);
      }
    }catch(err){}
  }

  async signIn(username : string, password : string) {
    
    const user : User = {
      username: username,
      password: password
    }

    try{
      const result = await firstValueFrom(this._httpClient.post<User>(`${this._URL_DIRECTION}/enter`, user, {withCredentials: true}));
      this._router.navigate(['/home']);
      return result;
    }catch(err : any){
      return err.error;
    }

  }

  async verifySession() {
    return await firstValueFrom(this._httpClient.get(`${this._URL_DIRECTION}`, {withCredentials: true}));
  }

  async getActualUserId () {
    try{
      return await firstValueFrom(this._httpClient.get<any>(`${this._URL_DIRECTION}/actualUser`, {withCredentials: true}))
    }catch(err){
      console.log(err);
      return null;
    }
  }

}

interface User {
  username: string;
  password: string;
}