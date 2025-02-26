import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe,CarouselModule ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
     items:1,
    nav: false,
  }
private readonly activatedRoute = inject(ActivatedRoute);
private readonly productsService = inject(ProductsService);
private readonly cartService = inject(CartService);
userId:string|null = null ;
productData:Iproducts|null = null;
ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        this.userId = p.get('id');
        this.productsService.getSpecificProduct(this.userId).subscribe({
          next:(res)=>{
            this.productData = res.data;
            console.log(res.data);
            
          },
          error:(e)=>{
            console.log(e);
            
          }
        })
        
      },
      error:(e)=>{
        console.log(e);
        
      }
    })
}

addToCart(id:string){
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
    console.log(res);
    this.cartService.cartNum.next(res.numOfCartItems);
    
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}
