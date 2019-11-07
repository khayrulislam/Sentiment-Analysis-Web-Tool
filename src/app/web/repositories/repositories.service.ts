import { Repository, Filter, RepositoryInput, Branch } from './../../data/data';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entries } from 'src/app/data/entries';

 var base_url:string = "https://localhost:44365";

@Injectable({
  providedIn: 'root'
})

export class RepositoriesService {

    private repo:Repository;
    private repositorySubject = new BehaviorSubject<Repository>(this.repo); 

    currentRepository = this.repositorySubject.asObservable();

    setRepositroy(repository : Repository){
        this.repositorySubject.next(repository);
    }

    constructor(private http:HttpClient) { }

    repositoryList(): Observable<Entries<Repository>> {
        return this.http.get<Entries<Repository>>(base_url+"/api/repository/GetList");
    }

    repositoryFilterList(filter:Filter): Observable<Entries<Repository>>{
        return this.http.post<Entries<Repository>>(base_url+"/api/repository/GetListByFilter",filter);
    }

    repositoryAnalysis(input:RepositoryInput):Observable<any>{
        return this.http.get<any>(base_url+"/api/repository/ExecuteAnalysis",{params:{repoOwnerName:input.RepositoryOwnerName,repoName:input.RepositoryName}});
    }

    branchFilterList(filter:Filter): Observable<Entries<Branch>>{
        return this.http.post<Entries<Branch>>(base_url+"/api/branch/GetBranchFilterList",filter);
    }

    dashboardDataList(repoId: string): Observable<any>{
        return this.http.get<any>(base_url+"/api/dashboard/GetDashboardData",{params:{repoId:repoId}});
    }

}
