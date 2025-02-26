import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrand } from '../../shared/interfaces/ibrand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  allBrands:IBrand[] = []
ngOnInit(): void {
  this.getAllBrands()
}

getAllBrands():void{
  this.brandsService.getAllBrands().subscribe({
    next:res=>{
      console.log(res.data);
      this.allBrands = res.data;
      
    },
    error:err=>{
      console.log(err);
      
    }
  })
}


getProducts(name:string){
  this.brandsService.specificBrand = name;
  console.log(this.brandsService.specificBrand);
  
}
}
