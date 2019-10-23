import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared-components/not-found/not-found.component';
import { SideNavComponent } from './web/side-nav/side-nav.component';
import { matDrawerAnimations } from '@angular/material/sidenav';


const routes: Routes = [
    {
        path:'',
        redirectTo: 'web',
        pathMatch: 'full'
    },
    {
        path:'web',
        //component : HeaderNavComponent,
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
