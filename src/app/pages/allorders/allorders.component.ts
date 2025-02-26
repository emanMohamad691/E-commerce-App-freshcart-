import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order/order.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { IUserOrders } from '../../shared/interfaces/iuser-orders';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allOrders',
  imports: [RouterLink],
  templateUrl: './allOrders.component.html',
  styleUrl: './allOrders.component.scss'
})
export class AllOrdersComponent implements OnInit {
private readonly orderService = inject(OrderService);
private readonly authService = inject(AuthService);

userId:string = '';
userOrders:IUserOrders[] = []

ngOnInit(): void {
   console.log( this.authService.getUserData().id);
   this.userId = this.authService.getUserData().id;
   this.getUserOrders()

   
}

getUserOrders(){
  this.orderService.getUserOrder(this.userId).subscribe({
    next:res =>{
      console.log(res);
      this.userOrders = res;
      
    },
    error:err =>{
      console.log(err);
      
    }
   })
}

}
