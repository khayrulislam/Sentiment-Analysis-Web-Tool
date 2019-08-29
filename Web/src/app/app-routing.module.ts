import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared-components/not-found/not-found.component';
import { AuthComponent } from './authentication/auth/auth.component';
import { NavigationComponent } from './main/navigation/navigation.component';


const routes: Routes = [
  {
    path : '', redirectTo:'/auth/account/sign-in', pathMatch : 'full'
  },
  {
    path : 'auth', redirectTo:'/auth/account/sign-in', pathMatch : 'full'
  },
  {
    path:'auth', 
    component: AuthComponent,
    loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
  },
  {
    path:'app',
    component: NavigationComponent,
    loadChildren: () => import('./main/main.module').then(mod => mod.MainModule)
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
