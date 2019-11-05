import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepositoriesComponent } from './repositories/repositories.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { BranchComponent } from './side-nav/branch/branch.component';
import { IssueComponent } from './side-nav/issue/issue.component';
import { PullRequestComponent } from './side-nav/pull-request/pull-request.component';
import { CollaboratorComponent } from './side-nav/collaborator/collaborator.component';


const routes: Routes = [
    {
        path:'',
        redirectTo:'repositories',
        pathMatch:'full'
    },
    {
        path:'repositories',
        component: RepositoriesComponent
    },
    {
        path:'repository/:repositoryName',
        component: SideNavComponent,
        children:[
            {
                path: 'branch',
                component:BranchComponent
            },
            {
                path: 'issue',
                component: IssueComponent
            },
            {
                path: 'pull-request',
                component: PullRequestComponent
            },
            {
                path: 'collaborator',
                component: CollaboratorComponent
            },
            {
                path: '',
                redirectTo: 'branch',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
