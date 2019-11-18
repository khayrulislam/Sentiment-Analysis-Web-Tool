import { NgxSpinnerService } from 'ngx-spinner';
import { RepositoriesService } from './../../repositories/repositories.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalData, Repository, ChartParams, Parameter } from 'src/app/data/data';
import { Chart } from 'highcharts';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnInit {

    repository: Repository;
    highcharts: typeof Highcharts ;
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
   
    // bra chart properties
    result: any[];
    colorScheme = {
      domain: ['#FF9800', '#4CAF50', '#F44334', '#00BCD4','#9C27B0','#E81E63','#6C757D', '#673AB7']
    };

    showLegend = true;

    showXAxis = true;
    showXAxisLabel = true;
    xAxisLabel = 'Sentiment value';

    showYAxis = true;
    showYAxisLabel = true;
    yAxisLabel = 'Count';

    chartParams: ChartParams;


    constructor(private route:ActivatedRoute, private rout: Router, 
        private repositoryService: RepositoriesService, private spinner:NgxSpinnerService) { }

    ngOnInit() {
        this.repositoryService.menuClickEventSend.subscribe( response =>{
            if(response==="menuClick") {
                setTimeout( () => {window.dispatchEvent(new Event('resize')); }, 50 );
                
            }
        });
        this.highcharts = Highcharts;
        this.repository =  JSON.parse(localStorage.getItem(LocalData.Repository)); 
        this.chartParams = {
            RepoId: this.repository.Id,
            Option: Parameter.Only
        };
        this.loadCommitData( String(this.repository.Id) );
    }

    loadCommitData(repoId:string){
        this.spinner.show();
        this.repositoryService.commitChartDataList(this.chartParams).subscribe( response=>{
            this.chartOptions.series = [{
                data: response.LineData,
                type: 'line',
                name: 'Sentiment chart'
            }];
            this.updateFromInput = true;
            this.result = response.PieData;
            this.spinner.hide();
        } );
    }


    onSelect(event:any){

    }

}
