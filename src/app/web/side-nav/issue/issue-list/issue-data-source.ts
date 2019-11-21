import { DataSource } from '@angular/cdk/table'
import { Issue, issueFilter } from 'src/app/data/data';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { RepositoriesService } from 'src/app/web/repositories/repositories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Entries } from 'src/app/data/entries';
import { catchError, finalize } from 'rxjs/operators';

export class IssueDataSource implements DataSource<Issue> {
    
    private issueSubject = new BehaviorSubject<Issue[]>([]);
    private issueLoading = new BehaviorSubject<boolean>(false);

    public loading$ = this.issueLoading.asObservable();
    public totlaData;


    constructor(private repositoryService: RepositoriesService, private spinner: NgxSpinnerService){
    }

    connect(collectionViewer: CollectionViewer): Observable<Issue[] | readonly Issue[]> {
        return this.issueSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.issueSubject.complete();
        this.issueLoading.complete();
    }
    


    loadIssueData(filter: issueFilter){
        this.issueLoading.next(true);
        this.spinner.show();
        this.repositoryService.issueFilterList(filter).pipe(
            catchError( () => ([])),
            finalize( () => this.issueLoading.next(false))
        ).
        subscribe( (response : Entries<Issue>) =>{
            this.issueSubject.next(response.Data);
            this.totlaData = response.TotalData;
            this.spinner.hide();
        }, err=>{ this.spinner.hide(); });

    }


    loadPullData(filter: issueFilter){
        this.issueLoading.next(true);
        this.spinner.show();
        this.repositoryService.pullRequestFilterList(filter).pipe(
            catchError( () => ([])),
            finalize( () => this.issueLoading.next(false))
        ).
        subscribe( (response : Entries<Issue>) =>{
            this.issueSubject.next(response.Data);
            this.totlaData = response.TotalData;
            this.spinner.hide();
        }, err=>{ this.spinner.hide(); });

    }

}
