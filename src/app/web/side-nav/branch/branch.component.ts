import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BranchDataSource } from './branch-data-source';
import { MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Filter, LocalData, Repository } from 'src/app/data/data';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoriesService } from '../../repositories/repositories.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
    
    branchCommit: boolean;
    repository: Repository;
    private repositoryId: number;
    private filter: Filter;
    branchDataSource : BranchDataSource;

    displayedColumns: string[] = ["BranchName","Sha"];
    length: number[] =  [5,10,20];
    @ViewChild(MatPaginator,{static : false}) paginator: MatPaginator;

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

}
