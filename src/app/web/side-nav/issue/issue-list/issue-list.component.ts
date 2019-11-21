import { Component, OnInit } from '@angular/core';
import { RepositoriesService } from 'src/app/web/repositories/repositories.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {

  constructor(private repositoryService: RepositoriesService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

}
