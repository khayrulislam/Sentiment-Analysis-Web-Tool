import { Branch, ChartParams } from './data';
import { Data } from '@angular/router'

export interface Repository {
    Id: number,
    RepoId: number,
    Name: string,
    OwnerName: string,
    AnalysisDate: Data,
    State: boolean,
    Url: string,
}

export interface RepositoryInput{
    RepositoryName: string,
    RepositoryOwnerName: string
}

export interface Filter{
    Id?:number;
    PageNumber: number,
    PageSize: number,
    SearchText: string,
    SortOrder: string
}

export enum ModalAction{
    CLOSE = "close",
    ANALYSIS = "analysis"
}

export interface Branch{
    Id: number,
    Name: string,
    Sha: string,
    RepositoryId: number,
}

export enum LocalData{
    Repository = "repository",
    Branch = "branch"
}

export enum NavigationItem{
    Dashboard = "dashboard",
    Branch = "branch",
    Issue = "issue",
    PullRequest = "pull-request",
    Collaborator = "collaborator",
    Commit = "commit",
    CommitComment = "commit-comment",
    IssueComment = "issue-comment",
    PullRequestComment = "pull-request-comment",
}

export enum Parameter{
    Name = "name",
    All = "all",
    Only = "only"
}


export interface ChartParams{
    RepoId : number,
    Option : string
}

export interface BranchChartParams extends ChartParams {
    BranchId: number,
}
