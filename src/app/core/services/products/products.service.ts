import { HttpClient } from '@angular/common/http';
import {  Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../customer_injection/api_url';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private httpClient: HttpClient, @Inject(api_url) private apiUrl: string) { }

  getAllProducts():Observable<any>{
    return this.httpClient.get(`${environment.api_url}/products`);
  }

  getSpecificProduct(id:string|null):Observable<any>{
    return this.httpClient.get(`${environment.api_url}/products/${id}`)
  }
}
