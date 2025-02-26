import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { WishListService } from '../../core/services/wishList/wish-list.service';


@Component({
  selector: 'app-specific-product-by-brand',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './specific-product-by-brand.component.html',
  styleUrl: './specific-product-by-brand.component.scss'
})
export class SpecificProductByBrandComponent implements OnInit {
private readonly brandsService = inject(BrandsService);
private readonly productsService = inject(ProductsService);
private readonly cartService = inject(CartService);
private readonly wishListService = inject(WishListService);
private readonly platformId = inject(PLATFORM_ID);


allData:Iproducts[]|null = null;

ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next:res=>{
        console.log(res.data);
        this.allData = res.data.filter((item:any)=>{
          return item.brand.name === this.brandsService.specificBrand;
        })

        console.log(this.allData);
        
        
      },
      error:err=>{
        console.log(err);
        
      }
    })

     if(isPlatformBrowser(this.platformId)){
          if(localStorage.getItem('wishlist')!==null){
            this.wishListService.productInLocalstorage = JSON.parse(localStorage.getItem('wishlist')!)
          }
        }

 
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
