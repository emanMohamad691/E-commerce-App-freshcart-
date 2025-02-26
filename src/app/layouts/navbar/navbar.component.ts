import { Component, inject, input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  // * use signal
  islogin = input<boolean>(true);
  cartNumber!:number;
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);


  ngOnInit(): void {
      this.cartService.cartNum.subscribe({
        next:(value)=>{
         this.cartNumber = value;
          
        }
      });

      this.cartService.getLoggedUserCard().subscribe({
        next:(res)=>{
          this.cartNumber = res.numOfCartItems
        }
      })
  }

  isLogOut():void{
    localStorage.removeItem('wishlist')
    this.authService.logOut();
  }
}
