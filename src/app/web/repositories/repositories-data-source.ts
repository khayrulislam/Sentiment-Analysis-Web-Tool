import { RepositoriesService } from './repositories.service';
import { Repository, Filter } from './../../data/data';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Entries } from 'src/app/data/entries';

export class RepositoriesDataSource implements DataSource<Repository>{
   
    private repositoriesSubject = new BehaviorSubject<Repository[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public totlaData;

    constructor(private repositoriesService:RepositoriesService){
    }

    connect(collectionViewer:CollectionViewer): Observable<Repository[] | readonly Repository[]> {
        return this.repositoriesSubject.asObservable();
    }   
    
    disconnect(collectionViewer:CollectionViewer): void {
        this.repositoriesSubject.complete();
        this.loadingSubject.complete();
    }

    loadRepositoryies(){
        this.loadingSubject.next(true);
        this.repositoriesService.repositoryList()
        .pipe(
            catchError( ()=>of([])),
            finalize(()=>this.loadingSubject.next(false))
            )
        .subscribe((data:Entries<Repository>)=>{
            this.repositoriesSubject.next(data.Data);
            this.totlaData = data.TotalData;
        });
    }

    loadFilterRepositoryies(filter: Filter){
        this.loadingSubject.next(true);
        this.repositoriesService.repositoryFilterList(filter)
        .pipe(
            catchError( ()=>of([])),
            finalize(()=>this.loadingSubject.next(false))
            )
        .subscribe((data:Entries<Repository>)=>{
            //debugger;
            this.repositoriesSubject.next(data.Data);
            this.totlaData = data.TotalData;
        });
    }

}
