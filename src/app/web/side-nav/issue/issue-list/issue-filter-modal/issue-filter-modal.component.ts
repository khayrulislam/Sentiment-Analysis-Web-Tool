import { Component, OnInit, Inject } from '@angular/core';
import { SelectOption, ModalAction } from 'src/app/data/data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-issue-filter-modal',
  templateUrl: './issue-filter-modal.component.html',
  styleUrls: ['./issue-filter-modal.component.scss']
})
export class IssueFilterModalComponent implements OnInit {

    stateOptions: SelectOption[];
    commentOptions: SelectOption[];

    selectedStateOption: string;
    selectedCommentOption: string;
    title : string;


    constructor(private dialogRef: MatDialogRef<IssueFilterModalComponent>, @Inject(MAT_DIALOG_DATA) data) 
    {
        this.title = data.title;
        this.selectedStateOption = data.state;
        this.selectedCommentOption = data.comment;
    }

    ngOnInit() {
        this.stateOptions= [
            { viewValue: "All", value:"all"},
            { viewValue: "Open", value:"open"},
            { viewValue: "Close", value:"closed"}
        ];
        this.commentOptions= [
            { viewValue: "All", value:"all"},
            { viewValue: "Comments", value:"only"},
            { viewValue: "No comments", value:"no"}
        ];
        

    }

    onStateChangeOption(event:any){
        this.selectedStateOption = event.value;
    }

    onCommentChangeOption(event:any){
        this.selectedCommentOption = event.value;
    }


    close(){
        this.dialogRef.close({event:ModalAction.CLOSE});
    }

    done(){
        this.dialogRef.close({event:ModalAction.DONE, data:{ state : this.selectedStateOption, comment: this.selectedCommentOption }});
    }

}
