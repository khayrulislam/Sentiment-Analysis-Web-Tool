import { Component, OnInit, ViewChild } from '@angular/core';
import { RepositoriesService } from 'src/app/web/repositories/repositories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IssueDataSource } from './issue-data-source';
import { issueFilter, Repository, LocalData, ModalAction } from 'src/app/data/data';
import { Router } from '@angular/router';
import { MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { tap } from 'rxjs/operators';
import { IssueFilterModalComponent } from './issue-filter-modal/issue-filter-modal.component';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {


    private repository: Repository;
    private repositoryId: number;
    private displayedColumns: string[] = ['IssueNumber','State','UpdateDate','CommentCount']; // ,'Pos','Neg','PosTitle','NegTitle'

    issueDataSource : IssueDataSource;

    private filter: issueFilter;
    length: number[] =  [5,10,20];

    @ViewChild(MatPaginator,{static : false}) paginator: MatPaginator;

    constructor(private repositoryService: RepositoriesService, private spinner: NgxSpinnerService,
        private router: Router, private matdialog: MatDialog) { }

    ngOnInit() {

        this.filter = {
            RepoId:0,
            PageNumber : 0,
            PageSize : this.length[0],
            SearchText : "",
            SortOrder : "asc",
            State: "all",
            Comment: "all"
        }
        this.issueDataSource = new IssueDataSource(this.repositoryService, this.spinner);

        this.getCurrentRepository();

    }

    ngAfterViewInit(){
        this.paginator.page.pipe(tap(()=>this.loadIssueData())).subscribe();        
    }

    loadIssueData(){
        this.filter.PageSize = this.paginator.pageSize,
        this.filter.PageNumber = this.paginator.pageIndex;
        this.issueDataSource.loadIssueData(this.filter);
    }

    getCurrentRepository(){
        this.repository =  JSON.parse(localStorage.getItem(LocalData.Repository)); 
        if(this.repository === undefined) {
            this.router.navigateByUrl(`/not-found`);
        }
        else{
            this.repositoryId = this.repository.Id;
            this.filter.RepoId = this.repositoryId;
            this.issueDataSource.loadIssueData(this.filter);
        }
    }

    openIssueFilter(){
        const matDialogConfig = new MatDialogConfig();
        matDialogConfig.autoFocus = true;
        matDialogConfig.width = '400px';
        matDialogConfig.data = {
            state: this.filter.State,
            comment: this.filter.Comment,
            title: "Issue Filter"
        }

        let dialogRef = this.matdialog.open(IssueFilterModalComponent, matDialogConfig);
        dialogRef.afterClosed().subscribe( (res) => {
            if( res.event && res.event == ModalAction.DONE){
                if(res.data){
                    this.filter.Comment = res.data.comment;
                    this.filter.State = res.data.state;
                }
                this.paginator.pageIndex = 0;
                this.loadIssueData();
            }
        });


    }

}
