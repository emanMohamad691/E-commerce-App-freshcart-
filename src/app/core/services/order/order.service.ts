import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

  checkOutOnlinePayment(id:string, data:object):Observable<any>{
    return this.httpClient.post(`${environment.api_url}/orders/checkout-session/${id}?url=http://localhost:4200`,{
      "shippingAddress":data
    })
  }

  checkOutCashPayment(id:string,data:object):Observable<any>{
    return this.httpClient.post(`${environment.api_url}/orders/${id}`,{
      "shippingAddress": data
    })
  }

  getUserOrder(id:string):Observable<any>{
    return this.httpClient.get(`${environment.api_url}/orders/user/${id}`)
  }
}
