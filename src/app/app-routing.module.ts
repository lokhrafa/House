import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './property/property-list/property-list/property-list.component';
import { AddPropertyComponent } from './property/add-property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail/property-detail.component';
import { PropertyDetailResolver } from './property/property-detail/property-detail/property-detail.resolver';
import { UserLoginComponent } from './user/user-register/user-login/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register/user-register.component';

const routes: Routes = [
  {path: '', component: PropertyListComponent},
   {path: 'rent-property', component: PropertyListComponent},
   {path: 'add-property', component: AddPropertyComponent},
   {path: 'property-detail/:id', component: PropertyDetailComponent, resolve:{prp: PropertyDetailResolver}},
   {path:'user/login',component:UserLoginComponent},
   {path:'user/register', component: UserRegisterComponent},
   {path:'**', component: PropertyListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
