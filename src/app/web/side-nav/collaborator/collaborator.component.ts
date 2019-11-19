import { Repository, LocalData, Filter } from 'src/app/data/data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CollaboratorDataSource } from './collaborator-data-source';
import { MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { RepositoriesService } from '../../repositories/repositories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {


    repository: Repository;
    filter: Filter
    repositoryId: number;

    contributorDataSource : CollaboratorDataSource;
    displayedColumns: string[] = ["Name","Contribution"];
    length: number[] =  [5,10,20];

    @ViewChild(MatPaginator,{static : false}) paginator: MatPaginator;

    constructor(private router:Router, private repositoryService: RepositoriesService,
        private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.filter = {
            Id:0,
            PageNumber : 0,
            PageSize : this.length[0],
            SearchText : "",
            SortOrder : "asc"
        };
        this.contributorDataSource = new CollaboratorDataSource(this.repositoryService, this.spinner);
        this.getCurrentRepository();
    }

    getCurrentRepository(){
        this.repository =  JSON.parse(localStorage.getItem(LocalData.Repository)); 
        if(this.repository === undefined) {
            this.router.navigateByUrl(`/not-found`);
        }
        else{
            this.repositoryId = this.repository.Id;
            this.filter.Id = this.repositoryId;
            this.contributorDataSource.loadCollaboratorData(this.filter);
        }
    }

    ngAfterViewInit(){
        this.paginator.page.pipe(tap(()=>this.loadCollaboratorData())).subscribe();        
    }

    loadCollaboratorData(){
        this.filter.PageNumber = this.paginator.pageIndex;
        this.filter.PageSize = this.paginator.pageSize;
        this.contributorDataSource.loadCollaboratorData(this.filter);
    }

}
