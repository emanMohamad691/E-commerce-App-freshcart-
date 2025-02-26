import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { MainComponent } from './layouts/main/main.component';
import { loginGuard } from './core/guards/login.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
    { path: "", redirectTo: 'home', pathMatch: 'full' },

    { 
        path: "", 
        component: AuthComponent,
        canActivate:[loggedGuard],
        children: [
            { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'login' },
            { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'register' },
            {path:'forgetPassword',loadComponent:()=>import('./pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),title:'forget password'}
        ]
    },

    { 
        path: "", 
        component: MainComponent,
        canActivate:[loginGuard],
        children: [
            { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'home' 
            },
            { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: 'cart' },
            { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'categories' },
            { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: 'brands' },
            { path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: 'products' },
            { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), data: { renderMode: 'no-prerender' } , title: 'details' },
            { path: 'checkout', loadComponent: () => import('./pages/check-out/check-out.component').then(m => m.CheckOutComponent), title: 'checkout' },
            { path: 'allorders', loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllOrdersComponent), title: 'allorders' },
            { path: 'specificProducts', loadComponent: () => import('./pages/specific-product/specific-product.component').then(m => m.SpecificProductComponent), title: 'categories' },
            { path: 'specificProductsByBrand', loadComponent: () => import('./pages/specific-product-by-brand/specific-product-by-brand.component').then(m => m.SpecificProductByBrandComponent), title: 'brands' },
            { path: 'wishList', loadComponent: () => import('./pages/wish-list/wish-list.component').then(m => m.WishListComponent), title: 'brands' },

            { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent), title: 'notfound' }
        ]
    }
];
