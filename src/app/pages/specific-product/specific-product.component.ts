
import { ProductsService } from '../../core/services/products/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-specific-product',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './specific-product.component.html',
  styleUrl: './specific-product.component.scss'
})
export class SpecificProductComponent {

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly platformId = inject(PLATFORM_ID);
  
  specificCategoryProducts:Iproducts[]|null = null;
  private readonly wishListService = inject(WishListService);
      wishList:Set<string> = new Set();
  ngOnInit(): void {
      this.productsService.getAllProducts().subscribe({
        next:res=>{
         this.specificCategoryProducts = res.data.filter((item:any)=>{
          
          
            return item.category.name === this.categoriesService.categoryName;
          })
         
          console.log(this.specificCategoryProducts);
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
