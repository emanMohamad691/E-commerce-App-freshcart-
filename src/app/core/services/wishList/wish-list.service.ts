import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  productInLocalstorage:string[] = [];

  constructor(private httpClient:HttpClient,@Inject(PLATFORM_ID) private pLATFORM_ID:any) { }

  addProductToWishlist(id:string):Observable<any>{
    return this.httpClient.post(`${environment.api_url}/wishlist`,{
       "productId":id
    })
  }

  removeProductFromWishlist(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.api_url}/wishlist/${id}`)
  }

  getLoggedUserWishlist():Observable<any>{
    return this.httpClient.get(`${environment.api_url}/wishlist`)
  }

  // wishList:any;
  // loadData(){
  //   if(isPlatformBrowser(this.pLATFORM_ID)){
  //         console.log('platform');
          
  //           const saveData = localStorage.getItem('wishlist');
  //           if(saveData){
  //             console.log('save');
              
  //             this.wishList = new Set(JSON.parse(saveData));
    
  //           }
  //          }
  // }
}
