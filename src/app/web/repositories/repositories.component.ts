import { Filter, Repository } from './../../data/data';
import { RepositoriesService } from './repositories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RepositoriesDataSource } from './repositories-data-source';
import { MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Router, Route } from '@angular/router';
import { InputModalComponent } from './input-modal/input-modal.component';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

    dataSource: RepositoriesDataSource;
    displayedColumns= ["RepoId", "RepositoryName","OwnerName","State","Url"];

    filter: Filter;

    @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
    
    constructor(private repositoriesService:RepositoriesService, private router:Router,
        private matDialog:MatDialog) {
        
    }

    ngOnInit() {
        this.dataSource = new RepositoriesDataSource(this.repositoriesService);
        this.filter = {
            PageNumber : 0,
            PageSize : 2,
            SearchText : "",
            SortOrder : "asc"
        };
        this.dataSource.loadFilterRepositoryies(this.filter);
    }

    ngAfterViewInit(){
        this.paginator.page
        .pipe(tap(() => this.loadRepositoryData()))
        .subscribe();
    }

    loadRepositoryData(){
        this.filter.PageSize = this.paginator.pageSize;
        this.filter.PageNumber = this.paginator.pageIndex;
        this.dataSource.loadFilterRepositoryies(this.filter);
    }

    showRepositoryDetail(repositoryData:Repository){
        this.router.navigateByUrl(`/web/repository/${repositoryData.Name}`);
    }

    openInputModal(){
        console.log("open modal");

        const matDialogConfig = new MatDialogConfig();
        matDialogConfig.autoFocus = true;
        matDialogConfig.width = '400px';
        //matDialogConfig.disableClose = true;

        this.matDialog.open(InputModalComponent,matDialogConfig);
    }

}
