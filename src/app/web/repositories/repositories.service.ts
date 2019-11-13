import { Repository, Filter, RepositoryInput, Branch, ChartParams, BranchChartParams } from './../../data/data';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entries } from 'src/app/data/entries';
import { API } from 'src/app/data/api';

 var base_url:string = "https://localhost:44365";

@Injectable({
  providedIn: 'root'
})

export class RepositoriesService {

    private repo:Repository;
    private repositorySubject = new BehaviorSubject<Repository>(this.repo); 
    currentRepository = this.repositorySubject.asObservable();

    private menuSubject = new BehaviorSubject<string>("menuClick");
    menuClickEventSend = this.menuSubject.asObservable();

    setClickEvent(eventName:string){
        this.menuSubject.next(eventName);
    }

    setRepositroy(repository : Repository){
        this.repositorySubject.next(repository);
    }

    constructor(private http:HttpClient) { }

    repositoryList(): Observable<Entries<Repository>> {
        return this.http.get<Entries<Repository>>(API.repositoryList);
    }

    repositoryFilterList(filter:Filter): Observable<Entries<Repository>>{
        return this.http.post<Entries<Repository>>(API.repositoryFilterList,filter);
    }

    repositoryAnalysis(input:RepositoryInput):Observable<any>{
        return this.http.get<any>(API.repositoryAnalysis,{params:{repoOwnerName:input.RepositoryOwnerName,repoName:input.RepositoryName}});
    }

    branchFilterList(filter:Filter): Observable<Entries<Branch>>{
        return this.http.post<Entries<Branch>>(API.branchFilterList,filter);
    }

    dashboardDataList(repoId: string): Observable<any>{
        return this.http.get<any>(API.dashboardDataList,{params:{repoId:repoId}});
    }

    commitChartDataList(chartParams: ChartParams):Observable<any>{
        return this.http.post<any>(API.commitChartDataList,chartParams);
    }

    branchCommitChartDataList(branchChartParams: BranchChartParams): Observable<any>{
        return this.http.post<any>(API.branchCommitChartDataList,branchChartParams);
    }

}
