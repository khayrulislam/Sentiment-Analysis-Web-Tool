import { Data } from '@angular/router'

export interface Repository {
    Id: number,
    RepoId: number,
    Name: string,
    OwnerName: string,
    AnalysisDate: Data,
    State: boolean,
    Url: string,
    Branch?:any
    RepositoryContributors?:any,
    Commits?: any,
    Issues?:any,
    Contributors?:any
}

export interface RepositoryInput{
    RepositoryName: string,
    RepositoryOwnerName: string
}

export interface Filter{
    PageNumber: number,
    PageSize: number,
    SearchText: string,
    SortOrder: string
}

export enum ModalAction{
    CLOSE = "close",
    ANALYSIS = "analysis"
}

