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
import { ListComponent } from './side-nav/branch/list/list.component';
import { CollaboratorListComponent } from './side-nav/collaborator/collaborator-list/collaborator-list.component';
import { CollaboratorDetailComponent } from './side-nav/collaborator/collaborator-detail/collaborator-detail.component';
import { IssueListComponent } from './side-nav/issue/issue-list/issue-list.component';
import { IssueDetailComponent } from './side-nav/issue/issue-detail/issue-detail.component';
import { PullListComponent } from './side-nav/pull-request/pull-list/pull-list.component';
import { PullDetailComponent } from './side-nav/pull-request/pull-detail/pull-detail.component';


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
                component:BranchComponent,
                children:[
                    {
                        path:'commit',
                        component:BCommitComponent
                    },
                    {
                        path:'list',
                        component: ListComponent
                    },
                    {
                        path:'',
                        redirectTo: 'list',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'issue',
                component: IssueComponent,
                children:[
                    {
                        path: 'list',
                        component: IssueListComponent
                    },
                    {
                        path: 'detail',
                        component: IssueDetailComponent
                    },
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'pull-request',
                component: PullRequestComponent,
                children:[
                    {
                        path:'list',
                        component: PullListComponent
                    },
                    {
                        path:'detail',
                        component: PullDetailComponent
                    },
                    {
                        path:'',
                        redirectTo:'list',
                        pathMatch:'full'
                    }
                ]
            },
            {
                path: 'collaborator',
                component: CollaboratorComponent,
                children:[
                    {
                        path:'list',
                        component: CollaboratorListComponent
                    },
                    {
                        path:'detail',
                        component: CollaboratorDetailComponent
                    },
                    {
                        path:'',
                        redirectTo:'list',
                        pathMatch:'full'
                    }
                ]
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
