import { CommitComponent } from './side-nav/commit/commit.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepositoriesComponent } from './repositories/repositories.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { BranchComponent } from './side-nav/branch/branch.component';
import { IssueComponent } from './side-nav/issue/issue.component';
import { PullRequestComponent } from './side-nav/pull-request/pull-request.component';
import { CollaboratorComponent } from './side-nav/collaborator/collaborator.component';
import { DashboardComponent } from './side-nav/dashboard/dashboard.component';
import { BCommitComponent } from './side-nav/branch/b-commit/b-commit.component';
import { TempComponent } from './side-nav/branch/temp/temp.component';


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
        path:'repository',
        component: SideNavComponent,
        children:[
            {
                path:'dashboard',
                component: DashboardComponent
            },
            {
                path: 'branch',
                component:TempComponent,
                children:[
                    {
                        path:'commit',
                        component:BCommitComponent
                    },
                    {
                        path:'bra',
                        component: BranchComponent
                    },
                    {
                        path:'',
                        redirectTo: 'bra',
                        pathMatch: 'full'
                    }
                ]
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
                path:'commit',
                component:CommitComponent
            },
            {
                path: '',
                redirectTo: 'dashboard',
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
