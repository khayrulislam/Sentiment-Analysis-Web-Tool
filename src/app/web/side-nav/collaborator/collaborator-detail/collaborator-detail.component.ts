import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Repository, Branch, BranchChartParams, SelectOption, CollaboratorChartParams, LocalData, Contributor, Parameter, CollaboratorDetail, ChartData } from 'src/app/data/data';
import { RepositoriesService } from 'src/app/web/repositories/repositories.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-collaborator-detail',
  templateUrl: './collaborator-detail.component.html',
  styleUrls: ['./collaborator-detail.component.scss']
})
export class CollaboratorDetailComponent implements OnInit {

    repository: Repository;
    branch: Branch;
    collaborator: Contributor;
    Highcharts: typeof Highcharts ;
    chartConstructor = "chart";
//    updateFromInput = false;
    updateFromInput1 = false;
    updateFromInput2 = false;
    updateFromInput3 = false;


    commitChartOptions: Highcharts.Options = {
        exporting: {
            enabled: true
        },
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'Commit sentiment over time'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Sentiment range'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series:[{
            type: 'line',
            name: 'Sentiment chart'
        }]
    };
    issueChartOptions: Highcharts.Options = {
        exporting: {
            enabled: true
        },
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'Issue sentiment over time'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Sentiment range'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series:[{
            type: 'line',
            name: 'Sentiment chart'
        }]
    };
    pullRequestChartOptions: Highcharts.Options = {
        exporting: {
            enabled: true
        },
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'Pull request sentiment over time'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Sentiment range'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series:[{
            type: 'line',
            name: 'Sentiment chart'
        }]
    };

    // chartOptions: Highcharts.Options =  {
    //     exporting: {
    //         enabled: true
    //     },
    //     chart: {
    //       zoomType: 'x'
    //     },
    //     title: {
    //       text: ' sentiment over time'
    //     },
    //     subtitle: {
    //       text: document.ontouchstart === undefined ?
    //         'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    //     },
    //     xAxis: {
    //       type: 'datetime'
    //     },
    //     yAxis: {
    //       title: {
    //         text: 'Sentiment range'
    //       }
    //     },
    //     legend: {
    //       enabled: false
    //     },
    //     plotOptions: {
    //       area: {
    //         fillColor: {
    //           linearGradient: {
    //             x1: 0,
    //             y1: 0,
    //             x2: 0,
    //             y2: 1
    //           },
    //           stops: [
    //             [0, Highcharts.getOptions().colors[0]],
    //           ]
    //         },
    //         marker: {
    //           radius: 2
    //         },
    //         lineWidth: 1,
    //         states: {
    //           hover: {
    //             lineWidth: 1
    //           }
    //         },
    //         threshold: null
    //       }
    //     },
    //     series:[{
    //         type: 'line',
    //         name: 'Sentiment chart'
    //     }]
    // };

    
    result: any[];

    commitResult: any[];
    issueResult: any[];
    pullRequestResult: any[];

    colorScheme = {
      domain: ['#FF9800', '#4CAF50', '#F44334', '#00BCD4','#9C27B0','#E81E63','#6C757D', '#673AB7']
    };
    gradient = false;

    collaboratorChartParams: CollaboratorChartParams;
    options: SelectOption[];

    commitOptions: SelectOption[];
    issueOptions: SelectOption[];
    pullRequestOptions: SelectOption[];

    selectedOption: string;

    commitSelectedOption: string;
    issueSelectedOption: string;
    pullRequestSelectedOption: string;

    constructor(private repositoryService: RepositoriesService, private spinner: NgxSpinnerService) { }

    ngOnInit() {

        this.componentSubscribe();
        this.initialize();
        // this.options= [
        //     { viewValue: "Sentiment Commits", value: Parameter.Only},
        //     { viewValue: "All commits", value: Parameter.All}
        // ];
        // this.selectedOption = this.options[0].value;
        // this.Highcharts = Highcharts;
        // this.loadCollaboratorDetail();

    }

    initialize(){
        this.repository =  JSON.parse(localStorage.getItem(LocalData.Repository)); 
        this.collaborator = JSON.parse(localStorage.getItem(LocalData.Collaborator)); 
        this.collaboratorChartParams = {
            RepoId : this.repository.Id,
            ContributorId : this.collaborator.Id,
            Option : Parameter.Only
        };
        this.Highcharts = Highcharts;

        // this.commitChartOptions =  Object.assign( {}, this.chartOptions); 
        // this.commitChartOptions.title.text = "Commit" +this.commitChartOptions.title.text; 
        // this.issueChartOptions = Object.assign( {}, this.chartOptions);
        // this.issueChartOptions.title.text = "Issue" +this.issueChartOptions.title.text; 
        // this.pullRequestChartOptions = Object.assign( {}, this.chartOptions);
        // this.pullRequestChartOptions.title.text = "Pull request" +this.pullRequestChartOptions.title.text; 

        this.commitOptions = [
            { viewValue: "Sentiment commits", value: Parameter.Only},
            { viewValue: "All commits", value: Parameter.All}
        ];
        this.commitSelectedOption = this.commitOptions[0].value;

        this.issueOptions = [
            { viewValue: "Sentiment issues", value: Parameter.Only},
            { viewValue: "All issues", value: Parameter.All}
        ];
        this.issueSelectedOption = this.issueOptions[0].value;

        this.pullRequestOptions = [
            { viewValue: "Sentiment pull request", value: Parameter.Only},
            { viewValue: "All pull request", value: Parameter.All}
        ];
        this.pullRequestSelectedOption = this.pullRequestOptions[0].value;

        this.loadCollaboratorDetail();
    }


    componentSubscribe(){
        this.repositoryService.menuClickEventSend.subscribe( response =>{
            if(response==="menuClick") {
                setTimeout( () => {window.dispatchEvent(new Event('resize')); }, 50 );
            }
        });
    }

    loadCollaboratorDetail(){

        // this.spinner.show();
        // this.repositoryService.contributorDetail(this.collaboratorChartParams).subscribe( (response : CollaboratorDetail)=>{
        //     debugger;
        //     this.commitChartOptions.series = [
        //         {
        //             data: response.Commit.LineData,
        //             type: 'line',
        //             name: 'Sentiment chart'
        //         }
        //     ];
        //     this.commitResult = response.Commit.PieData;
        //     //this.updateFromInput1 = true;

        //     this.issueChartOptions.series = [
        //         {
        //             data: response.Issue.LineData,
        //             type: 'line',
        //             name: 'Issue chart'
        //         }
        //     ];
        //     this.issueResult = response.Issue.PieData;

        //     this.pullRequestChartOptions.series = [
        //         {
        //             data: response.PullRequest.LineData,
        //             type: 'line',
        //             name: 'Pull request chart'
        //         }
        //     ];
        //     this.pullRequestResult = response.PullRequest.PieData;

        //     this.updateFromInput = true;
        //     // this.chartOptions.series = [{
        //     //     data: response.Commit.LineData,
        //     //     type: 'line',
        //     //     name: 'Sentiment chart'
        //     // }];
        //     // this.result = response.Commit.PieData;
        //     this.spinner.hide();
        // }, err =>{ this.spinner.hide()} );

        this.loadCollaboratorCommitDetail();
        this.loadCollaboratorIssueDetail();
        this.loadCollaboratorPullRequestDetail();

    }


    loadCollaboratorCommitDetail(){
        this.spinner.show();
        this.repositoryService.contributorCommitDetail(this.collaboratorChartParams).subscribe( (response: ChartData)=>{
            this.commitChartOptions.series = [
                {
                    data: response.LineData,
                    type: 'line',
                    name: 'Sentiment chart'
                }
            ];
            this.commitResult = response.PieData;
            this.updateFromInput1 = true;
            this.spinner.hide();
        }, err=>{ this.spinner.hide()} );
    }

    onCommitChangeOption(event:any){
        this.collaboratorChartParams.Option = this.commitSelectedOption;
        this.loadCollaboratorCommitDetail();
    }

    loadCollaboratorIssueDetail(){
        this.spinner.show();
        this.repositoryService.contributorIssueDetail(this.collaboratorChartParams).subscribe( (response: ChartData)=>{
            this.issueChartOptions.series = [
                {
                    data: response.LineData,
                    type: 'line',
                    name: 'Sentiment chart'
                }
            ];
            this.issueResult = response.PieData;
            this.updateFromInput2 = true;
            this.spinner.hide();
        }, err=>{ this.spinner.hide()} );
    }

    onIssueChangeOption(event: any){
        this.collaboratorChartParams.Option = this.issueSelectedOption;
        this.loadCollaboratorIssueDetail();
    }

    loadCollaboratorPullRequestDetail(){
        this.spinner.show();
        this.repositoryService.contributorPullRequestDetail(this.collaboratorChartParams).subscribe( (response: ChartData)=>{
            this.pullRequestChartOptions.series = [
                {
                    data: response.LineData,
                    type: 'line',
                    name: 'Sentiment chart'
                }
            ];
            this.pullRequestResult = response.PieData;
            this.updateFromInput3 = true;
            this.spinner.hide();
        }, err=>{ this.spinner.hide()} );
    }

    onPullRequestChangeOption(event: any){
        this.collaboratorChartParams.Option = this.pullRequestSelectedOption;
        this.loadCollaboratorPullRequestDetail();
    }

}
