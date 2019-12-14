import { NgxSpinnerService } from 'ngx-spinner';
import { Filter, Repository, ModalAction, LocalData, RepositoryInput } from './../../data/data';
import { RepositoriesService } from './repositories.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RepositoriesDataSource } from './repositories-data-source';
import { MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { InputModalComponent } from './input-modal/input-modal.component';
import { catchError, finalize } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

    dataSource: RepositoriesDataSource;
    displayedColumns= ["RepoId", "RepositoryName","OwnerName","State","Url","Action"];
    length: number[] =  [5,10,20];
    filter: Filter;

    searchSubject: Subject<string> = new Subject();

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

        this.searchSubject.pipe().subscribe((searchText)=>{
            this.filter.SearchText = searchText;
            this.loadRepositoryData();
        });

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
        this.router.navigate(['../repository'],{queryParams:{name:repository.Name}, relativeTo:this.r});
    }

    openInputModal(){
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
                    setTimeout( () => {this.loadRepositoryData();}, 1000 );
                    console.log( " update analysis " )
                });
                console.log( " data"+ res.data.RepositoryName )
            }
        });
    }


    reAnalyzeRepository(repository:any){
        debugger;
        let repo : RepositoryInput = {
            RepositoryName: repository.Name,
            RepositoryOwnerName:repository.OwnerName
        };
        this.repositoriesService.repositoryAnalysis(repo).pipe(
            catchError( ()=> of([])),
            finalize(()=> {})
        ).subscribe(()=>{
            setTimeout( () => {this.loadRepositoryData();}, 1000 );
            console.log( " update analysis " )
        });
    }

    search(searchText:string){
        this.searchSubject.next(searchText);
        this.paginator.pageIndex = 0;
    }



    download(){

        this.repositoriesService.downloadRepository().subscribe( (response)=>{

            let blob = new Blob([response], { type: 'application/octet-stream' });
            FileSaver.saveAs( blob,'report.xlsx' );
        });
    }

}
