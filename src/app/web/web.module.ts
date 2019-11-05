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
import { MatProgressBarModule, MatDialogModule } from '@angular/material';
import { InputModalComponent } from './repositories/input-modal/input-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchComponent } from './side-nav/branch/branch.component';
import { IssueComponent } from './side-nav/issue/issue.component';
import { PullRequestComponent } from './side-nav/pull-request/pull-request.component';
import { CollaboratorComponent } from './side-nav/collaborator/collaborator.component';
import { CommitComponent } from './side-nav/commit/commit.component';

@NgModule({
  declarations: [ SideNavComponent,  RepositoriesComponent, InputModalComponent, BranchComponent, IssueComponent, PullRequestComponent, CollaboratorComponent, CommitComponent],
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
    ReactiveFormsModule
  ],
  entryComponents:[InputModalComponent]
})
export class WebModule { }
