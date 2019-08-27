import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedComponent } from './shared/shared.component';
import { RecoveryPassComponent } from './recovery-pass/recovery-pass.component';


const routes: Routes = [
  {
    path : 'shared', redirectTo:'shared/sign-in', pathMatch : 'full' 
  },
  {
    path:'shared', component: SharedComponent,
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
