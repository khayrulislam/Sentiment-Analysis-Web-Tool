import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-input-modal',
  templateUrl: './input-modal.component.html',
  styleUrls: ['./input-modal.component.scss']
})
export class InputModalComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<InputModalComponent>) { }

    ngOnInit() {
    }

    close(){
        this.dialogRef.close();
    }

    save(){

    }


}
