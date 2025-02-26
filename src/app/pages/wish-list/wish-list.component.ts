import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent  {
private readonly wishListService = inject(WishListService);
private readonly cartService = inject(CartService);
private readonly platformId = inject(PLATFORM_ID);



products:Iproducts[]|null = null;
// wishList:Set<string> = new Set();


ngOnInit(): void {
   this.getAllProductInWishlist()
    if(isPlatformBrowser(this.platformId)){
         if(localStorage.getItem('wishlist')!==null){
           this.wishListService.productInLocalstorage = JSON.parse(localStorage.getItem('wishlist')!)
         }
       }
  //  this.wishListService.loadData();
  //  this.wishList = this.wishListService.wishList
}

getAllProductInWishlist(){
  this.wishListService.getLoggedUserWishlist().subscribe({
    next:res=>{
      console.log(res.data);
      if(res.status === "success"){
        this.products = res.data;
      }
      
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

  removeItem(id:string){

    this.wishListService.removeProductFromWishlist(id).subscribe({
      next:res=>{
        console.log(res);
        localStorage.setItem('wishlist',JSON.stringify(res.data))
        this.wishListService.productInLocalstorage = JSON.parse(localStorage.getItem('wishlist')!)

        this.getAllProductInWishlist()
        
      },
      error:err=>{
        console.log(err);
        
      }
    });
    }
   
    // if(this.wishList.has(id)){
    //   this.wishList.delete(id);
     
    

    // localStorage.setItem('wishlist',JSON.stringify(Array.from(this.wishList)))

  }

