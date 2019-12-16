import { RepositoriesService } from 'src/app/web/repositories/repositories.service';
import { DataSource } from '@angular/cdk/table';
import { Contributor, Filter } from 'src/app/data/data';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Entries } from 'src/app/data/entries';
import { catchError, finalize } from 'rxjs/operators';

export class CollaboratorDataSource implements DataSource<Contributor> {
    
    private CollaboratorSubject = new BehaviorSubject<Contributor[]>([]);
    private CollaboratorLoading = new BehaviorSubject<boolean>(false);

    public totlaData;
    public loading$ = this.CollaboratorLoading.asObservable();

    constructor(private repositoryService: RepositoriesService, private spinner:NgxSpinnerService){
    }

    connect(collectionViewer:CollectionViewer): Observable<Contributor[] | readonly Contributor[]> {
        return this.CollaboratorSubject.asObservable();
    }    
    
    disconnect(collectionViewer: CollectionViewer): void {
        this.CollaboratorLoading.complete();
        this.CollaboratorSubject.complete();
    }

    loadCollaboratorData(filter:Filter){
        this.spinner.show();
        this.repositoryService.contributorFilterList(filter).pipe(
            catchError( () => ([])),
            finalize( () => this.CollaboratorLoading.next(false))
        ).subscribe(  (response: Entries<Contributor>) =>{
            this.CollaboratorSubject.next(response.Data);
            this.totlaData = response.TotalData;
            this.spinner.hide();
        }, err=>{
            this.spinner.hide();
        })
    }

}
