import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    result: any[] = [
        {
          "name": "Germany",
          "value": 40632,
          "extra": {
            "code": "de"
          }
        },
        {
          "name": "United States",
          "value": 50000,
          "extra": {
            "code": "us"
          }
        },
        {
          "name": "France",
          "value": 36745,
          "extra": {
            "code": "fr"
          }
        },
        {
          "name": "United Kingdom",
          "value": 36240,
          "extra": {
            "code": "uk"
          }
        },
        {
          "name": "Spain",
          "value": 33000,
          "extra": {
            "code": "es"
          }
        },
        {
          "name": "Italy",
          "value": 35800,
          "extra": {
            "code": "it"
          }
        },
        {
            "name": "Italy1",
            "value": 35800,
            "extra": {
              "code": "it1"
            }
        },
        {
            "name": "Italy2",
            "value": 35800,
            "extra": {
              "code": "it2"
            }
          }
      ];
    multi: any[];
    view: any[] = [800, 400];
    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    animation = true;
  


    constructor() { }

    ngOnInit() {

    }

    loadDashboardData(){

    }

}
