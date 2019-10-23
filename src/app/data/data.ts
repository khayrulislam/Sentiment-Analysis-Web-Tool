import { Data } from '@angular/router'

export interface Repository {
    Id: number,
    RepoId: number,
    Name: string,
    OwnerName: string,
    AnalysisDate: Data,
    Url: string,
    Branch?:any
    RepositoryContributors?:any,
    Commits?: any,
    Issues?:any,
    Contributors?:any
}

export interface Filter{
    PageNumber: number,
    PageSize: number,
    SearchText: string,
    SortOrder: string
}

