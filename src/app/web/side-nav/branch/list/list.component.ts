import { Component, OnInit, ViewChild } from '@angular/core';
import { Repository, Filter, LocalData } from 'src/app/data/data';
import { BranchDataSource } from '../branch-data-source';
import { MatPaginator } from '@angular/material';
import { RepositoriesService } from 'src/app/web/repositories/repositories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    branchCommit: boolean;
    repository: Repository;
    private repositoryId: number;
    private filter: Filter;
    branchDataSource : BranchDataSource;

    displayedColumns: string[] = ["BranchName","Sha"];
    length: number[] =  [5,10,20];
    
    @ViewChild(MatPaginator,{static : false}) paginator: MatPaginator;

    searchSubject : Subject<string> = new Subject();

    constructor(private repositoryService:RepositoriesService, private router:Router, 
        private spinner:NgxSpinnerService, private r:ActivatedRoute) { }

    ngOnInit() {
        this.branchCommit = false;
        this.filter = {
            Id:0,
            PageNumber : 0,
            PageSize : this.length[0],
            SearchText : "",
            SortOrder : "asc"
        };
        this.searchSubject.pipe( debounceTime(500)).subscribe( (searchText) =>{
            this.filter.SearchText = searchText;
            this.loadBranchData();
        });
        this.branchDataSource = new BranchDataSource(this.repositoryService,this.spinner);
        this.getCurrentRepository();
    }

    ngAfterViewInit(){
        this.paginator.page.pipe(tap(()=>this.loadBranchData())).subscribe();        
    }

    getCurrentRepository(){
        this.repository =  JSON.parse(localStorage.getItem(LocalData.Repository)); 
        if(this.repository === undefined) {
            this.router.navigateByUrl(`/not-found`);
        }
        else{
            this.repositoryId = this.repository.Id;
            this.filter.Id = this.repositoryId;
            this.branchDataSource.loadBranchData(this.filter);
        }
    }

    loadBranchData(){
        this.filter.PageNumber = this.paginator.pageIndex;
        this.filter.PageSize = this.paginator.pageSize;
        this.branchDataSource.loadBranchData(this.filter);
    }

    showCommit(row:any){
        this.branchCommit = true;
        localStorage.setItem(LocalData.Branch, JSON.stringify(row) );
        this.router.navigate(['../commit'],{queryParams:{name:this.repository.Name,branch:row.Name}, relativeTo:this.r});
    }

    search(searchText:string){
        this.searchSubject.next(searchText);
        this.paginator.pageIndex = 0;
    }

}
