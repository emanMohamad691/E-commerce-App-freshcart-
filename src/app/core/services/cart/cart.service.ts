import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNum:BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private httpClient:HttpClient) { }

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${environment.api_url}/cart`,{
      "productId": id,
      
    },
    {
      headers:{
        token:localStorage.getItem('token')!
      }
    }
  )
  }

  getLoggedUserCard():Observable<any>{
    return this.httpClient.get(`${environment.api_url}/cart`)
  }

  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.api_url}/cart/${id}`)
  }

  UpdateCartProductQuantity(id:string,newCount:number):Observable<any>{
    return this.httpClient.put(`${environment.api_url}/cart/${id}`,{
       "count": newCount
    }
  )
  }

  deleteUerCart():Observable<any>{
    return this.httpClient.delete(`${environment.api_url}/cart`)
  }
}
