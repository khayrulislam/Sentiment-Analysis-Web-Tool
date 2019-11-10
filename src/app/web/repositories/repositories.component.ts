import { NgxSpinnerService } from 'ngx-spinner';
import { Filter, Repository, ModalAction, LocalData } from './../../data/data';
import { RepositoriesService } from './repositories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RepositoriesDataSource } from './repositories-data-source';
import { MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { InputModalComponent } from './input-modal/input-modal.component';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { JsonpInterceptor } from '@angular/common/http';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

    dataSource: RepositoriesDataSource;
    displayedColumns= ["RepoId", "RepositoryName","OwnerName","State","Url"];
    length: number[] =  [5,10,20];
    filter: Filter;

    @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
    
    constructor(private repositoriesService:RepositoriesService, private router:Router,
        private matDialog:MatDialog,private spinner:NgxSpinnerService, private r:ActivatedRoute) {
        
    }

    ngOnInit() {
        this.dataSource = new RepositoriesDataSource(this.repositoriesService,this.spinner);
        this.filter = {
            Id:0,
            PageNumber : 0,
            PageSize : this.length[0],
            SearchText : "",
            SortOrder : "asc"
        };
        this.dataSource.loadFilterRepositoryies(this.filter);
    }

    ngAfterViewInit(){
        this.paginator.page.pipe(tap(() => this.loadRepositoryData())).subscribe();
    }

    loadRepositoryData(){
        this.filter.PageSize = this.paginator.pageSize;
        this.filter.PageNumber = this.paginator.pageIndex;
        this.dataSource.loadFilterRepositoryies(this.filter);
    }

    showRepositoryDetail(repository:Repository){
        localStorage.setItem(LocalData.Repository, JSON.stringify(repository));
        //this.repositoriesService.setRepositroy(repository);
        // this.router.navigateByUrl(`/web/repository/${repository.Name}`);
        this.router.navigate(['../repository'],{queryParams:{name:repository.Name}, relativeTo:this.r});
        // this.router.navigateByUrl(`/web/repository/dashboard?name=${repository.Name}`);
    }

    openInputModal(){
        console.log("open modal");

        const matDialogConfig = new MatDialogConfig();
        matDialogConfig.autoFocus = true;
        matDialogConfig.width = '400px';
        //matDialogConfig.disableClose = true;
        let openDialogRef = this.matDialog.open(InputModalComponent,matDialogConfig);
        openDialogRef.afterClosed().subscribe(res =>{
            
            if(res.event == ModalAction.ANALYSIS){
                this.repositoriesService.repositoryAnalysis(res.data).pipe(
                    catchError( ()=> of([])),
                    finalize(()=> {})
                ).subscribe(()=>{
                    this.loadRepositoryData();
                    console.log( " updae analysis " )
                });
                console.log( " data"+ res.data.RepositoryName )
            }

        });
    }

}
