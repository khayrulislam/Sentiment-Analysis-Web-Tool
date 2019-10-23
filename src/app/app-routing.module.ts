import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared-components/not-found/not-found.component';
import { SideNavComponent } from './web/side-nav/side-nav.component';
import { matDrawerAnimations } from '@angular/material/sidenav';
import { HeaderNavComponent } from './web/header-nav/header-nav.component';


const routes: Routes = [
//   {
//     path : '', redirectTo:'/auth/account/sign-in', pathMatch : 'full'
//   },
//   {
//     path : 'auth', redirectTo:'/auth/account/sign-in', pathMatch : 'full'
//   },
//   {
//     path:'auth', 
//     component: AuthComponent,
//     loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
//   },
//   {
//     path:'sentiment',
//     component: NavigationComponent,
//     loadChildren: () => import('./main/main.module').then(mod => mod.MainModule)
//   },
    // {
    //     path:'',
    //     redirectTo: 'header',
    //     pathMatch: 'full'
    // },
    {
        path:'hh',
        component : HeaderNavComponent,
        loadChildren: () => import('./web/web.module').then(mod=>mod.WebModule)
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
