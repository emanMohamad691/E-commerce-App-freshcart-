import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICartProducts } from '../../shared/interfaces/icart-products';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
private readonly cart  = inject(CartService);
allLoggedProduct:ICartProducts = {} as ICartProducts;

ngOnInit(): void {
  this.getAllLoggedProduct();
}


getAllLoggedProduct():void{
  this.cart.getLoggedUserCard().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.allLoggedProduct = res.data;
      
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

removeItem(id:string):void{
  
this.cart.removeSpecificCartItem(id).subscribe({
  next:(res)=>{
    console.log(res);
    this.allLoggedProduct = res.data;
    this.cart.cartNum.next(res.numOfCartItems)
    
  },
  error:(err)=>{
    console.log(err);
    
  }
})
}

updateCount(id:string, newCount:number):void{
this.cart.UpdateCartProductQuantity(id,newCount).subscribe({
  next:(res)=>{
console.log(res.data);
// this.getAllLoggedProduct
this.allLoggedProduct = res.data

  },
  error:(err)=>{
    console.log(err);
    
  }
})
}

clearCart():void{
  this.cart.deleteUerCart().subscribe({
    next:res=>{
      console.log(res);
      if(res.message = 'success'){
        this.getAllLoggedProduct()
        this.cart.cartNum.next(0)
      }
      
      
    },
    error:err=>{
      console.log(err);
      
    }
  })
}
}
