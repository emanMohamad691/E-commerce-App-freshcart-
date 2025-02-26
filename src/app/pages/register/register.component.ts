import { Component, inject, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit  {
  ngOnInit(): void {
      ['name','email','password','rePassword','phone'].forEach((item)=>{
        this.registerForm.get(item)?.valueChanges.subscribe(()=>{
          this.msgError = ''
        })
      })
  }
 
  isLoading:boolean = false;
  msgError:string = '';
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  // *register form
registerForm:FormGroup = new FormGroup({
  name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl(null, [Validators.required,Validators.email]),
  password:new FormControl(null, [Validators.required,Validators.pattern(/^[A-Z]\w{8,}$/)]),
  rePassword:new FormControl(null),
  phone:new FormControl(null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]),

},{validators:[this.customValidation]});

customValidation(group:AbstractControl){
  // *group == registerForm
 const password = group.get('password')?.value;
 const rePassword  = group.get('rePassword')?.value;

 return password === rePassword?null:{misMatch:true};
//  if(password === rePassword){
//   return null

//  }else{
// return {misMatch:true}
//  }

}

onsubmit():void{
if(this.registerForm.valid){
  this.isLoading = true;
  this.authService.sendSignupData(this.registerForm.value).subscribe({
    next: (data)=>{
      console.log(data)
      if(data.message === 'success'){
        this.router.navigate(['/login']);
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
    this.registerForm.markAllAsTouched();
  }
}
}
