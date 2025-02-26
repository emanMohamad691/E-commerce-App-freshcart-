import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { WishListService } from '../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
private readonly productsService = inject(ProductsService);
private readonly cartService = inject(CartService);
private readonly wishListService = inject(WishListService);
private readonly platformId = inject(PLATFORM_ID);

wishList:Set<string> = new Set();

products:Iproducts[]  = [];
ngOnInit(): void {

  this.getAllProducts();
   if(isPlatformBrowser(this.platformId)){
         if(localStorage.getItem('wishlist')!==null){
           this.wishListService.productInLocalstorage = JSON.parse(localStorage.getItem('wishlist')!)
         }
       }
  

}
getAllProducts(){
  this.productsService.getAllProducts().subscribe({
    next:res=>{
      console.log(res.data);
      this.products = res.data;
      
    },
    error:err=>{
      console.log(err);
      
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

addToWishList(e:Event,id:string){
  e.stopPropagation();
  console.log(id);
  if(this.wishListService.productInLocalstorage.includes(id)){
    this.wishListService.removeProductFromWishlist(id).subscribe({
      next:res=>{
        console.log(res);
        localStorage.setItem('wishlist',JSON.stringify(res.data))
        this.wishListService.productInLocalstorage = JSON.parse(localStorage.getItem('wishlist')!)

       
        
      },
      error:err=>{
        console.log(err);
        
      }
    });
  }else{
    this.wishListService.addProductToWishlist(id).subscribe({
      next:res=>{
        console.log(res);
        
        localStorage.setItem('wishlist',JSON.stringify(res.data))
        this.wishListService.productInLocalstorage = JSON.parse(localStorage.getItem('wishlist')!)
  
        
      }
    })
  }
  
  
}

IsProductInWishlist(id:string){
  if(this.wishListService.productInLocalstorage.includes(id)){
    return true;
  }else{
    return false;
  }
}
}
