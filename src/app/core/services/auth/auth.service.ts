import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
router = inject(Router);
  constructor(private httpClient:HttpClient) { }
userData:any;
  sendSignupData(data:object):Observable<any>{
    return this.httpClient.post(`${environment.api_url}/auth/signup`,data)
  }

  sendLoginData(data:object):Observable<any>{
    return this.httpClient.post(`${environment.api_url}/auth/signin`,data)
  }

  getUserData(){
  return this.userData =   jwtDecode(localStorage.getItem('token')!);
  // console.log(this.userData);
  
  }

  logOut():void{
    localStorage.removeItem('token');
    this.userData = null;
    this.router.navigate(['/login']);
  }


  // * forget password

  verifyEmail(email:object):Observable<any>{
    return this.httpClient.post(`${environment.api_url}/auth/forgotPasswords`,email);
  }


  verifyCode(code:object):Observable<any>{
    return this.httpClient.post(`${environment.api_url}/auth/verifyResetCode`,code);
  }


  resetPassword(newPassword:object):Observable<any>{
    return this.httpClient.put(`${environment.api_url}/auth/resetPassword`,newPassword);
  }
}
