import { Component, OnInit, ViewChild } from '@angular/core';
import { Repository, issueFilter, ModalAction, LocalData } from 'src/app/data/data';
import { IssueDataSource } from '../../issue/issue-list/issue-data-source';
import { MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { RepositoriesService } from 'src/app/web/repositories/repositories.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { IssueFilterModalComponent } from '../../issue/issue-list/issue-filter-modal/issue-filter-modal.component';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-pull-list',
  templateUrl: './pull-list.component.html',
  styleUrls: ['./pull-list.component.scss']
})
export class PullListComponent implements OnInit {

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

    result: any[];
    colorScheme = {
      domain: ['#FF9800', '#4CAF50', '#F44334', '#00BCD4','#9C27B0','#E81E63','#6C757D', '#673AB7']
    };

    private repository: Repository;
    private repositoryId: number;
    private displayedColumns: string[] = ['pullNumber','State','UpdateDate','CommentCount']; // ,'Pos','Neg','PosTitle','NegTitle'

    pullDataSource : IssueDataSource;

    private filter: issueFilter;
    length: number[] =  [5,10,20];

    @ViewChild(MatPaginator,{static : false}) paginator: MatPaginator;

    constructor(private repositoryService: RepositoriesService, private spinner: NgxSpinnerService,
        private router: Router, private matdialog: MatDialog) { }

    ngOnInit() {
        this.filter = {
            RepoId:0,
            PageNumber : 0,
            PageSize : this.length[0],
            SearchText : "",
            SortOrder : "asc",
            State: "all",
            Comment: "all"
        };
        this.highcharts = Highcharts;
        this.pullDataSource = new IssueDataSource(this.repositoryService, this.spinner);
        this.getCurrentRepository();
    }

    ngAfterViewInit(){
        this.paginator.page.pipe(tap(()=>this.loadPullData())).subscribe();        
    }

    loadPullData(){
        this.filter.PageSize = this.paginator.pageSize,
        this.filter.PageNumber = this.paginator.pageIndex;
        this.pullDataSource.loadPullData(this.filter);
        this.loadPullRequestChartData();
    }

    loadPullRequestChartData(){
        this.spinner.show();
        this.repositoryService.pullRequestFilterChartDataList(this.filter).subscribe((response)=>{
            this.chartOptions.series = [{
                data: response.LineData,
                type: 'line',
                name: 'Sentiment chart'
            }];
            this.updateFromInput = true;
            this.result = response.PieData;
            this.spinner.hide();
        }, err=>{ this.spinner.hide();});

    }


    getCurrentRepository(){
        this.repository =  JSON.parse(localStorage.getItem(LocalData.Repository)); 
        if(this.repository === undefined) {
            this.router.navigateByUrl(`/not-found`);
        }
        else{
            this.repositoryId = this.repository.Id;
            this.filter.RepoId = this.repositoryId;
            this.pullDataSource.loadPullData(this.filter);
            this.loadPullRequestChartData();
        }
    }

    openPullFilter(){
        const matDialogConfig = new MatDialogConfig();
        matDialogConfig.autoFocus = true;
        matDialogConfig.width = '400px';
        matDialogConfig.data = {
            state: this.filter.State,
            comment: this.filter.Comment,
            title: "Pull Request Filter"
        }

        let dialogRef = this.matdialog.open(IssueFilterModalComponent, matDialogConfig);
        dialogRef.afterClosed().subscribe( (res) => {
            if(res.event == ModalAction.DONE){
                if(res.data){
                    this.filter.Comment = res.data.comment;
                    this.filter.State = res.data.state;
                }
                debugger;
                this.paginator.pageIndex = 0;
                this.loadPullData();    
            }
        });
    }


}
