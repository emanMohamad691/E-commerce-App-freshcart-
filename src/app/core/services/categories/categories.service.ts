import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Icategories } from '../../../shared/interfaces/icategories';
// import { api_url } from '../../customer_injection/api_url';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // private readonly apiUrl  = inject(api_url);
  categoryName:string = '';
  constructor(private httpClient:HttpClient) { }

  getAllCategories():Observable<any>{
    return this.httpClient.get(environment.api_url + '/categories');
  }

  getSpecificCategories(id:string):Observable<any>{
    return this.httpClient.get(environment.api_url + `/categories/${id}`);
  }
}
