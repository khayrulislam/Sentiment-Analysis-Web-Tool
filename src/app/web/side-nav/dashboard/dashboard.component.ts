import { Parameter } from './../../../data/data';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from '../../repositories/repositories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalData, Repository, NavigationItem } from 'src/app/data/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    repository: Repository;
    result: any[];
    multi: any[];
    view: any[] = [1000, 400];
    colorScheme = {
      domain: ['#FF9800', '#4CAF50', '#F44334', '#00BCD4','#9C27B0','#E81E63','#6C757D', '#673AB7']
    };

    animation = true;

    constructor(private repositoryService: RepositoriesService, private router: Router, 
        private r:ActivatedRoute, private spinner:NgxSpinnerService) { }

    ngOnInit() {
        this.getCurrentRepository();
    }

    getCurrentRepository(){
        this.repository =  JSON.parse(localStorage.getItem(LocalData.Repository)); 
        this.r.queryParams.subscribe( queryParam =>{
            let repoName = queryParam[Parameter.Name];
            if(this.repository === undefined || this.repository.Name !== repoName) this.router.navigateByUrl(`/not-found`);
            else this.loadDashboardData(this.repository.Id);
        });
    }

    loadDashboardData(repoId:number){
        this.spinner.show();
        this.repositoryService.dashboardDataList(String(repoId)).subscribe( (response : any) =>{
            this.result = response;
            this.spinner.hide();
        });
    }

    onSelect(event){
        switch(event.extra.code){
            case NavigationItem.Branch:
                this.router.navigate(['../branch'],{ queryParams:{name:this.repository.Name}, relativeTo: this.r });
                break;
            case NavigationItem.Issue:
                this.router.navigate(['../issue'], { queryParams:{name:this.repository.Name}, relativeTo: this.r});
                break;
            case NavigationItem.Collaborator:
                this.router.navigate(['../collaborator'],{ queryParams:{name:this.repository.Name}, relativeTo:this.r});
                break;
            case NavigationItem.PullRequest:
                this.router.navigate(['../pull-request'],{ queryParams:{name:this.repository.Name}, relativeTo:this.r});
                break;
            case NavigationItem.Commit:
                this.router.navigate(['../commit'],{ queryParams:{name:this.repository.Name}, relativeTo:this.r});
                break;
            case NavigationItem.CommitComment:
                this.router.navigate(['../commit'],{ queryParams:{name:this.repository.Name}, relativeTo:this.r});
                break;
            case NavigationItem.IssueComment:
                this.router.navigate(['../issue'],{ queryParams:{name:this.repository.Name}, relativeTo:this.r});
                break;
            case NavigationItem.PullRequestComment:
                this.router.navigate(['../pull-request'],{ queryParams:{name:this.repository.Name}, relativeTo:this.r});
                break;
            default:
                break;
        }
    }


}
