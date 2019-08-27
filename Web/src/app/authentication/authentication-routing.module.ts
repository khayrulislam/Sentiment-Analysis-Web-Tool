import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RecoveryPassComponent } from './recovery-pass/recovery-pass.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  {
    path : 'account', redirectTo:'account/sign-in', pathMatch : 'full' 
  },
  {
    path:'account', component: AccountComponent,
    children:[
      {
        path:'sign-in', component: SignInComponent
      },
      {
        path:'sign-up', component: SignUpComponent
      }
    ]
  },
  {
    path:'account-recovery', component: RecoveryPassComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
