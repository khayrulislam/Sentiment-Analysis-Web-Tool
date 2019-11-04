import { DataSource } from '@angular/cdk/table';
import { Branch, Filter } from 'src/app/data/data';
import { CollectionViewer }  from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { RepositoriesService } from '../../repositories/repositories.service';
import { catchError, finalize } from 'rxjs/operators';
import { Entries } from 'src/app/data/entries';



export class BranchDataSource implements DataSource<Branch> {
    
    private branchSubject = new BehaviorSubject<Branch[]>([]);
    private branchLoading = new BehaviorSubject<boolean>(false);

    public loading$ = this.branchLoading.asObservable();
    public totlaData;

    constructor(private repositoryService:RepositoriesService){
    }

    connect( collectionViewer: CollectionViewer): Observable<Branch[] | readonly Branch[]> {
        return this.branchSubject.asObservable();
    }
    
    disconnect(collectionViewer: CollectionViewer): void {
        this.branchSubject.complete();
        this.branchLoading.complete();
    }

    loadBranchData(filter: Filter){
        this.branchLoading.next(true);
        this.repositoryService.branchFilterList(filter).pipe(
            catchError( () => ([])),
            finalize( () => this.branchLoading.next(false))
        ).subscribe( (response : Entries<Branch>) =>{
            this.branchSubject.next(response.Data);
            this.totlaData = response.TotalData
        });
    }
}
