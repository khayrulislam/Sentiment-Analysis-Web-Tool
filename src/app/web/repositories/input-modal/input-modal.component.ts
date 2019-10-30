import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RepositoryInput } from 'src/app/data/data';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent implements OnInit {

    repoInput: RepositoryInput;
    repositoryInputForm: FormGroup;
    RepositoryName = new FormControl('',[Validators.required]);
    RepositoryOwnerName = new FormControl('',[Validators.required]);

    constructor(private dialogRef: MatDialogRef<InputModalComponent>, private formBuilder: FormBuilder) 
    { }

    ngOnInit() {
        this.initialize();
        this.createInputForm();
    }

    initialize(){
        this.repoInput = {
            RepositoryName:"",
            RepositoryOwnerName:""
        };
    }

    createInputForm(){
        this.repositoryInputForm = this.formBuilder.group({
            "RepositoryName": this.RepositoryName,
            "RepositoryOwnerName": this.RepositoryOwnerName
        });
    }

    close(){
        this.dialogRef.close();
    }

    analysis(){
        this.repoInput.RepositoryName = this.repositoryInputForm.value.RepositoryName;
        this.repoInput.RepositoryOwnerName = this.repositoryInputForm.value.RepositoryOwnerName;
        this.dialogRef.close({event:"RepositoryAnalysis",data: this.repoInput});
    }


}
