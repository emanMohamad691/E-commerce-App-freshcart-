import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
      this.loginForm.get('email')?.valueChanges.subscribe(()=>{
        this.msgError = ''
      });
      this.loginForm.get('password')?.valueChanges.subscribe(()=>{
        this.msgError = ''
      })
  }
isLoading:boolean = false;
  msgError:string = '';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);


  // *register form
loginForm:FormGroup = new FormGroup({
  email:new FormControl(null, [Validators.required,Validators.email]),
  password:new FormControl(null, [Validators.required,Validators.pattern(/^[A-Z]\w{8,}$/)]),

});



onsubmit():void{
if(this.loginForm.valid){
  console.log(this.loginForm);
  
  this.isLoading = true;
  this.authService.sendLoginData(this.loginForm.value).subscribe({
    next: (data)=>{
      console.log(data)
      if(data.message === 'success'){
        localStorage.setItem('token',data.token);
        this.authService.getUserData();
        this.router.navigate(['/home']);
      }
      this.isLoading = false;
    },
    error:(err)=>{
      console.log(err);
      this.isLoading = false;
      this.msgError = err.error.message;
      
    }
  })
    
  }else{
    this.loginForm.markAllAsTouched()
  }
}
}
