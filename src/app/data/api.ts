import { environment } from './../../environments/environment';
export const API = {

    // repositories
    repositoryList: `${environment.server_api}/repository/GetList`,
    repositoryFilterList: `${environment.server_api}/repository/GetFilterList`,
    repositoryAnalysis: `${environment.server_api}/repository/ExecuteAnalysis`,

    // branch
    branchFilterList: `${environment.server_api}/branch/GetFilterList`,
    branchCommitChartDataList: `${environment.server_api}/branch/GetCommitChartData`,

    // dashboard
    dashboardDataList: `${environment.server_api}/dashboard/GetCardData`,

    // commit
    commitChartDataList: `${environment.server_api}/commit/GetChartData`,

    // contributor
    contributorFilterList: `${environment.server_api}/contributor/GetFilterList`,
    contributorDetail: `${environment.server_api}/contributor/GetDetail`
}
