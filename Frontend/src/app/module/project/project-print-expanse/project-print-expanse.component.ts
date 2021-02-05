import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  expanseId: string;
}
@Component({
  selector: 'app-project-print-expanse',
  templateUrl: './project-print-expanse.component.html',
  styleUrls: ['./project-print-expanse.component.scss']
})
export class ProjectPrintExpanseComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProjectPrintExpanseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.data.expanseId],
      printExpanse:[true],
      printAdvanceVoucher:[true],
      printRequestExpanse:[true],
      printLiquidation:[false],
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  printExpanse(){

  }
}
