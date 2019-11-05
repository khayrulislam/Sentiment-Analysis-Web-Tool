import { Component, OnInit, ViewChild } from '@angular/core';
import { RepositoriesService } from '../../repositories/repositories.service';
import { BranchDataSource } from './branch-data-source';
import { MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';
import { Filter } from 'src/app/data/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

    private repositoryId: number;
    private filter: Filter;
    branchDataSource : BranchDataSource;

    displayedColumns: string[] = ["BranchName","Sha"];
    @ViewChild(MatPaginator,{static : false}) paginator: MatPaginator;

    constructor(private repositoryService:RepositoriesService, private router:Router) { }

    ngOnInit() {
        this.filter = {
            Id:0,
            PageNumber : 0,
            PageSize : 2,
            SearchText : "",
            SortOrder : "asc"
        };
        this.branchDataSource = new BranchDataSource(this.repositoryService);
        this.getCurrentRepository();
    }

    ngAfterViewInit(){
        this.paginator.page.pipe(tap(()=>this.loadBranchData())).subscribe();        
    }

    getCurrentRepository(){
        this.repositoryService.currentRepository.subscribe(repository =>{
            debugger;
            if(repository ===undefined) {
                this.router.navigateByUrl(`/not-found`);
            }
            else{
                debugger;
                this.repositoryId = repository.Id;
                this.filter.Id = this.repositoryId;
                this.branchDataSource.loadBranchData(this.filter);
            }
        },err=>{
            console.log(err);
        });
    }

    loadBranchData(){
        this.filter.PageNumber = this.paginator.pageIndex;
        this.filter.PageSize = this.paginator.pageSize;
        this.branchDataSource.loadBranchData(this.filter);
    }

}
