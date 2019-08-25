import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSharedComponent } from './auth-shared/auth-shared.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {
    path:'sign-in', component: SignInComponent
  },
  {
    path:'sign-up', component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
