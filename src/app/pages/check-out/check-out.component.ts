import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { OrderService } from '../../core/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly cartService =  inject(CartService);
  private readonly orderService= inject(OrderService);
  private readonly ToastrService= inject(ToastrService);
  private readonly router= inject(Router);
  checkOutForm!:FormGroup;
  isLoadingOnline:boolean  = false;
  isLoadingCash:boolean = false;
  cardId:string = '';


ngOnInit(): void {
    this.checkOutForm = this.formBuilder.group({
      details:[null,[Validators.required]],
      phone:[null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]],
      city:[null,[Validators.required]]
    });

    this.getCartId()
}
getCartId():void{
  this.cartService.getLoggedUserCard().subscribe({
    next:(res)=>{
     this.cardId = res.cartId;
     console.log(this.cardId);
     
      
    }
  })
}
onSubmit():void{
  this.isLoadingOnline = true;
  if(this.checkOutForm.valid){
   
    this.orderService.checkOutOnlinePayment(this.cardId,this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res.session.url);
        if(res.status === 'success'){
          open(res.session.url,'_self')
        }

        this.isLoadingOnline = false;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }else {
    this.checkOutForm.markAllAsTouched();
    this.isLoadingOnline = false;
  }
  
}

submitPaymentCash():void{
  
  this.isLoadingCash = true;
  if(this.checkOutForm.valid){
    this.orderService.checkOutCashPayment(this.cardId,this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res);

        if(res.status === "success"){
          this.ToastrService.success('The request was completed successfully')
         
          
        }
       
        this.checkOutForm.reset();
        this.isLoadingCash = false;
       setTimeout(() => {
        this.router.navigate(['/home'])
       }, 1000);

        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }else {
    this.checkOutForm.markAllAsTouched();
    this.isLoadingCash = false;
  }
}
}
