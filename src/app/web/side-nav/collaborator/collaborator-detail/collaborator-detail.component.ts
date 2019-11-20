import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Repository, Branch, BranchChartParams, SelectOption, CollaboratorChartParams, LocalData, Contributor, Parameter, CollaboratorDetail } from 'src/app/data/data';
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
    updateFromInput = false;
    chartOptions: Highcharts.Options =  {
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

    
    result: any[];
    colorScheme = {
      domain: ['#FF9800', '#4CAF50', '#F44334', '#00BCD4','#9C27B0','#E81E63','#6C757D', '#673AB7']
    };
    gradient = false;

    collaboratorChartParams: CollaboratorChartParams;
    options: SelectOption[];
    selectedOption: string;

    constructor(private repositoryService: RepositoriesService, private spinner: NgxSpinnerService) { }

    ngOnInit() {

        this.componentSubscribe();

        this.repository =  JSON.parse(localStorage.getItem(LocalData.Repository)); 
        this.collaborator = JSON.parse(localStorage.getItem(LocalData.Collaborator)); 

        this.collaboratorChartParams = {
            RepoId : this.repository.Id,
            ContributorId : this.collaborator.Id,
            Option : Parameter.Only
        };

        this.options= [
            { viewValue: "Sentiment Commits", value: Parameter.Only},
            { viewValue: "All commits", value: Parameter.All}
        ];
        this.selectedOption = this.options[0].value;
        this.Highcharts = Highcharts;
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

        this.spinner.show();
        this.repositoryService.contributorDetail(this.collaboratorChartParams).subscribe( (response : CollaboratorDetail)=>{
            debugger;
            this.chartOptions.series = [{
                data: response.Commit.LineData,
                type: 'line',
                name: 'Sentiment chart'
            }];
            this.updateFromInput = true;
            this.result = response.Commit.PieData;
            this.spinner.hide();
        } );

    }

    onChangeOption(event:any){
        debugger;
        this.collaboratorChartParams.Option =  this.selectedOption;
        this.loadCollaboratorDetail();
    }

}
