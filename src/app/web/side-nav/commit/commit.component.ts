import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnInit {

    result: any[] = [
        [
            1167609600000,
            -1
        ],
        [
            1167696000000,
            0.7537
        ],
        [
            1167782400000,
            0.7559
        ],
        [
            1167868800000,
            -3
        ],
        [
            1167955200000,
            0.7644
        ],
        [
            1168214400000,
            0.769
        ],
        [
            1168300800000,
            4
        ],
        [
            1168387200000,
            0.77
        ],
        [
            1168473600000,
            0.7703
        ],
        [
            1168560000000,
            0.7757
        ],
        [
            1168819200000,
            0.7728
        ],
        [
            1168905600000,
            0.7721
        ],
        [
            1168992000000,
            0.7748
        ],
        [
            1169078400000,
            0.774
        ],
        [
            1169164800000,
            0.7718
        ],
        [
            1169424000000,
            0.7731
        ],
        [
            1169510400000,
            0.767
        ],
        [
            1169596800000,
            0.769
        ],
        [
            1169683200000,
            0.7706
        ],
        [
            1169769600000,
            0.7752
        ],
        [
            1170028800000,
            0.774
        ],
        [
            1170115200000,
            0.771
        ],
        [
            1170201600000,
            0.7721
        ],
        [
            1170288000000,
            0.7681
        ],
        [
            1170374400000,
            0.7681
        ],
        [
            1170633600000,
            0.7738
        ],
        [
            1170720000000,
            0.772
        ],
        [
            1170806400000,
            0.7701
        ],
        [
            1170892800000,
            0.7699
        ],
        [
            1170979200000,
            0.7689
        ],
        [
            1171238400000,
            0.7719
        ],
        [
            1171324800000,
            0.768
        ],
        [
            1171411200000,
            0.7645
        ],
        [
            1171497600000,
            0.7613
        ],
        [
            1171584000000,
            0.7624
        ],
        [
            1171843200000,
            0.7616
        ],
        [
            1171929600000,
            0.7608
        ],
        [
            1172016000000,
            0.7608
        ],
        [
            1172102400000,
            0.7631
        ],
        [
            1172188800000,
            0.7615
        ]
    ]    
    // multi: any[];
    // //view: any[] = [1000, 400];
    // colorScheme = {
    //   domain: ['#FF9800', '#4CAF50', '#F44334', '#00BCD4','#9C27B0','#E81E63','#6C757D', '#673AB7']
    // };
    // animation = true;

    constructor() { }

    ngOnInit() {

        Highcharts.chart('container', {
            chart: {
              zoomType: 'x'
            },
            title: {
              text: 'USD to EUR exchange rate over time'
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
                text: 'Exchange rate'
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
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
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
      
            series: [{
              type: 'area',
              name: 'USD to EUR',
              data: this.result
            }]
          });
    }


    onSelect(event:any){

    }

}
