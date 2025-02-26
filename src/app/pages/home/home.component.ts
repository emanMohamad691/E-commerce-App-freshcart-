import { Component, inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { WishListService } from '../../core/services/wishList/wish-list.service';


@Component({
  selector: 'app-home',
  imports: [CarouselModule,SearchPipe,FormsModule,CurrencyPipe,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

 // * all properties
 homeProducts:Iproducts[] = [];
 categories:Icategories[]= [];
IdOfProduct:string =''
 searchValue:string = '';

  // * all services
private readonly productsService = inject(ProductsService);
private readonly categoriesService  = inject(CategoriesService);
private readonly cartService = inject(CartService);
private readonly wishListService = inject(WishListService);
private readonly platformId = inject(PLATFORM_ID);

 
  ngOnInit(): void {
    
    this.getProducts()
    this.getCategories();

    this.wishListService.getLoggedUserWishlist().subscribe({
      next:res=>{
        console.log(res.data);
        if(res.data.length){
          res.data.forEach((element:any) => {
            this.wishListService.productInLocalstorage.push(element.id)
          });
          if(isPlatformBrowser(this.platformId)){
            localStorage.setItem('wishlist',JSON.stringify(this.wishListService.productInLocalstorage));

          }
        }
       else if(isPlatformBrowser(this.platformId)){
      
          if(localStorage.getItem('wishlist')!==null){
            this.wishListService.productInLocalstorage = JSON.parse(localStorage.getItem('wishlist')!)
          }
        }
        
      }
    })

   

    
 }
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
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  customMainSlider: OwlOptions = {
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
    items: 1,
    nav: false
  }

 
 

  

// * all methods
getProducts(){
  this.productsService.getAllProducts().subscribe({
    next:res=>{
      console.log(res.data);
      this.homeProducts = res.data;
      
    }
   })
}

getCategories(){
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
     this.categories = res.data;
      
    },
  error:(err)=>{
    console.log(err);
    
  }   })
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
        this.IdOfProduct = res.data;
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
