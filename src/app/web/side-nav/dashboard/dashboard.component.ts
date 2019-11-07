import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from '../../repositories/repositories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalData } from 'src/app/data/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    result: any[];
    multi: any[];
    view: any[] = [1000, 400];
    colorScheme = {
      domain: ['#FF9800', '#4CAF50', '#F44334', '#00BCD4','#9C27B0','#E81E63','#6C757D', '#673AB7']
    };
    animation = true;

    constructor(private repositoryService: RepositoriesService, private router: Router, private r:ActivatedRoute) { }

    ngOnInit() {
        this.getCurrentRepository();
    }

    getCurrentRepository(){
        let repository =  JSON.parse(localStorage.getItem(LocalData.Repository)); 
        if(repository ===undefined) this.router.navigateByUrl(`/not-found`);
        else this.loadDashboardData(repository.Id);
    }

    loadDashboardData(repoId:number){
        this.repositoryService.dashboardDataList(String(repoId)).subscribe( (response : any) =>{
            this.result = response;
        });
    }

    onSelect(event){
        if(event.extra.code === "branch") this.router.navigate(['../branch'],{ relativeTo: this.r });
        else if (event.extra.code === "issue") this.router.navigate(['../issue'], {relativeTo: this.r});
        else if (event.extra.code === "collaborator") this.router.navigate(['../collaborator'],{relativeTo:this.r});
        else if (event.extra.code === "pull_request") this.router.navigate(['../pull-request'],{relativeTo:this.r});
        else if (event.extra.code === "commit") this.router.navigate(['../commit'],{relativeTo:this.r});
        else if (event.extra.code === "commit_comment") this.router.navigate(['../commit'],{relativeTo:this.r});
        else if (event.extra.code === "issue_comment") this.router.navigate(['../issue'],{relativeTo:this.r});
        else if (event.extra.code === "pull_request_comment") this.router.navigate(['../pull-request'],{relativeTo:this.r});
    }


}
