import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSharedComponent } from './authentication/auth-shared/auth-shared.component';
import { NotFoundComponent } from './shared-components/not-found/not-found.component';


const routes: Routes = [
  {
    path : '', redirectTo:'/auth/sign-in', pathMatch : 'full'
  },
  {
    path:'auth', 
    component: AuthSharedComponent,
    loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
  },
  {
    path: '**', component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
