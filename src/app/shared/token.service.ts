import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  public baseUrl = environment.apiUrl;


  constructor() { }

  handleData(token){
    localStorage.setItem('auth_token', token);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  // User state based on valid token
  isLoggedIn() {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  // Remove token
  removeToken(){
    localStorage.removeItem('auth_token');
  }

}