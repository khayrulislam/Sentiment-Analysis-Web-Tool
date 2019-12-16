import { ChartData } from 'src/app/data/data';
import { Branch, ChartParams, Contributor } from './data';

export interface Repository {
    Id: number,
    RepoId: number,
    Name: string,
    OwnerName: string,
    AnalysisDate: Date,
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

export interface issueFilter{
    RepoId:number;
    PageNumber: number,
    PageSize: number,
    SearchText: string,
    SortOrder: string,
    State: string,
    Comment: string
}

export interface Issue{
    Id: number,
    IssueNumber: number,
    Pos: number,
    Neg: number,
    PosTitle: number,
    NegTitle: number,
    State: string,
    UpdateDate: Date,
    CommentCount: number
}

export interface Branch{
    Id: number,
    Name: string,
    Sha: string,
    RepositoryId: number,
}

export interface Contributor{
    Id: number,
    Name: string,
    ContributorId: number,
    Contribution: number
}

export enum ModalAction{
    CLOSE = "close",
    ANALYSIS = "analysis",
    DONE = "done"
}

export enum LocalData{
    Repository = "repository",
    Branch = "branch",
    Collaborator = "collaborator"
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


// chart interface

export interface ChartParams{
    RepoId : number,
    Option : string
}

export interface BranchChartParams extends ChartParams {
    BranchId: number,
}

export interface CollaboratorChartParams extends ChartParams{
    ContributorId: number
}

export interface PieSliceData{
    name : string,
    value : number,
    extra : {
        code : string
    }
}

export interface ChartData{
    LineData : [],
    PieData : []
}

export interface CollaboratorDetail{
    Commit : ChartData,
    Issue : ChartData,
    PullRequest: ChartData
}


export interface SelectOption{
    value:string,
    viewValue:string
}
