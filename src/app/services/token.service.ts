import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { constants } from '../core/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() { }
  setToken(token: string){
   localStorage.setItem(constants.CURRENT_TOKEN,token);
  }
  getToken():string | null{
     return localStorage.setItem(constants.CURRENT_TOKEN);
  }
  removeToken(){
    
  }
}
