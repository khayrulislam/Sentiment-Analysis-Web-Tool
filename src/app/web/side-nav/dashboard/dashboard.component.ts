import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from '../../repositories/repositories.service';
import { Router } from '@angular/router';

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

    constructor(private repositoryService: RepositoriesService, private router: Router) { }

    ngOnInit() {
        this.getCurrentRepository();
    }

    getCurrentRepository(){
        this.repositoryService.currentRepository.subscribe(repository =>{
            debugger;
            if(repository ===undefined) {
                this.router.navigateByUrl(`/not-found`);
            }
            else{
                this.loadDashboardData(repository.Id);
            }
        },err=>{
            console.log(err);
        });
    }

    loadDashboardData(repoId:number){
        this.repositoryService.dashboardDataList(String(repoId)).subscribe( (response : any) =>{
            this.result = response;
            console.log("data "+ response);
        });
    }

    onSelect(event){
        if(event.extra.code === "branch") this.router.navigate(['branch']);
        else if (event.extra.code === "issue") this.router.navigate(['issue']);
        else if (event.extra.code === "collaborator") this.router.navigate(['collaborator']);
        else if (event.extra.code === "issue") this.router.navigate(['issue']);
        else if (event.extra.code === "issue") this.router.navigate(['issue']);
        else if (event.extra.code === "issue") this.router.navigate(['issue']);
        else if (event.extra.code === "issue") this.router.navigate(['issue']);


    }


}
