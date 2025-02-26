import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {

  ngOnInit(): void {
      this.verifyCode.get('resetCode')?.valueChanges.subscribe(()=>{
        this.msError = ''
      })

      this.verifyEmail.get('email')?.valueChanges.subscribe(()=>{
        this.msError = ''
      });


      ['email','newPassword'].forEach((item)=>{
        this.resetPassword.get(item)?.valueChanges.subscribe(()=>{
           this.msError = ''
        })
      })


      
  }
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  isLoading:boolean = false;
  step:number = 1;
  msError:string = '';


// !sendEmail 
verifyEmail:FormGroup = this.formBuilder.group({
  email:[null,[Validators.email,Validators.required]]
})

sendEmail(){
  console.log(this.verifyEmail.value);
this.isLoading = true;
  if(this.verifyEmail.valid){
    this.authService.verifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg == 'success'){
          this.toastrService.success(res.message);
          this.step = 2;
          console.log(res.message);
          
        }
        this.isLoading = false;
        
      },
      error:(err)=>{
        console.log(err);
        this.msError = err.error.message;
        this.isLoading = false
      }
    })
  }else{
    this.verifyEmail.markAllAsTouched()
    this.isLoading = false;
  }
  
}

// !send code 
verifyCode:FormGroup = this.formBuilder.group({
  resetCode:[null,[Validators.required,Validators.pattern(/^[0-9]{6,}$/)]]
})

sendCode(){
  console.log(this.verifyCode.value);
this.isLoading = true;
  if(this.verifyCode.valid){
    this.authService.verifyCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res);

        if(res.status == 'Success'){
          this.toastrService.success(res.status);
          this.step = 3;
          console.log(res);
          
        }
        this.isLoading = false;
        
      },
      error:(err)=>{
        console.log(err.error.message);
        this.msError = err.error.message;
        this.isLoading = false
        
      }
    })
  }else{
    this.verifyCode.markAllAsTouched()
    this.isLoading = false;
  }
  
}

// !reset password 

resetPassword:FormGroup = this.formBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  newPassword:[null,[Validators.required,Validators.pattern(/^[A-Z]\w{8,}$/)]]
})


sendNewPassword(){
  console.log(this.resetPassword.value);
this.isLoading = true;
  if(this.resetPassword.valid){
    this.authService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);

        if(res.token){
          this.toastrService.success("Your password is updated");
          localStorage.setItem('token',res.token)
          this.authService.getUserData();
          this.router.navigate(['/home'])
          console.log(res);
          
        }
        this.isLoading = false;
        
      },
      error:(err)=>{
        console.log(err.error.message);
        this.msError = err.error.message;
        this.isLoading = false
        
      }
    })
  }else{
    this.resetPassword.markAllAsTouched()
    this.isLoading = false;
  }
  
}

}


