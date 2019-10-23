import { Repository, Filter } from './../../data/data';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entries } from 'src/app/data/entries';

 var base_url:string = "https://localhost:44365";

@Injectable({
  providedIn: 'root'
})

export class RepositoriesService {

  constructor(private http:HttpClient) { }

    repositoryList(): Observable<Entries<Repository>> {
        return this.http.get<Entries<Repository>>(base_url+"/api/repository/GetList");
    }

    repositoryFilterList(filter:Filter): Observable<Entries<Repository>>{
        return this.http.post<Entries<Repository>>(base_url+"/api/repository/GetListByFilter",filter);
    }
}
