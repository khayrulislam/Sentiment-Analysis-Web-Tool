import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RepositoriesComponent } from './repositories/repositories.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MatProgressBarModule, MatDialogModule, MatSelectModule } from '@angular/material';
import { InputModalComponent } from './repositories/input-modal/input-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchComponent } from './side-nav/branch/branch.component';
import { IssueComponent } from './side-nav/issue/issue.component';
import { PullRequestComponent } from './side-nav/pull-request/pull-request.component';
import { CollaboratorComponent } from './side-nav/collaborator/collaborator.component';
import { CommitComponent } from './side-nav/commit/commit.component';
import { DashboardComponent } from './side-nav/dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerModule } from "ngx-spinner";
import { HighchartsChartModule } from 'highcharts-angular';
import { BCommitComponent } from './side-nav/branch/b-commit/b-commit.component';
import { ListComponent } from './side-nav/branch/list/list.component';
import { CollaboratorListComponent } from './side-nav/collaborator/collaborator-list/collaborator-list.component';
import { CollaboratorDetailComponent } from './side-nav/collaborator/collaborator-detail/collaborator-detail.component';
import { IssueListComponent } from './side-nav/issue/issue-list/issue-list.component';
import { IssueDetailComponent } from './side-nav/issue/issue-detail/issue-detail.component';

@NgModule({
  declarations: [ SideNavComponent,  RepositoriesComponent, InputModalComponent, BranchComponent, IssueComponent, PullRequestComponent, CollaboratorComponent, CommitComponent, DashboardComponent, BCommitComponent,  ListComponent, CollaboratorListComponent, CollaboratorDetailComponent, IssueListComponent, IssueDetailComponent],
  imports: [
    CommonModule,
    WebRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule,
    MatProgressBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxSpinnerModule,
    HighchartsChartModule,
    MatSelectModule
  ],
  entryComponents:[InputModalComponent]
})
export class WebModule { }
