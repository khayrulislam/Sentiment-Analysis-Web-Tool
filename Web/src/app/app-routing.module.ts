import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSharedComponent } from './authentication/auth-shared/auth-shared.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';


const routes: Routes = [
    {
      path:'auth', 
      component: AuthSharedComponent,
      // children:[
      //   {
      //     path:'sign-in',
      //     component: SignInComponent
      //   },
      //   {
      //     path:'sign-up', 
      //     component: SignUpComponent
      //   },
      // ]
      //children: [{ path: '', component: AuthSharedComponent }]
      loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
    },
    {
      path : '', redirectTo:'/auth', pathMatch : 'full'
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
