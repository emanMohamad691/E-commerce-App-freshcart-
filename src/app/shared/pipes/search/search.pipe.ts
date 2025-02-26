import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:any,product:string): any {
    return products.filter((item:any)=>{
      return item.title.toLowerCase().includes(product.toLowerCase());
    });
  }

}
