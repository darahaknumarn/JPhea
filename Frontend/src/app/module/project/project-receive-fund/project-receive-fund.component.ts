import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import { AppConfirmService } from '@ecoinsoft/core-frontend/src/lib/shared/services/app-confirm/app-confirm.service';
import { ProjectReceiveFundService } from 'app/services/project-receive-fund.service';
import { ProjectTransferService } from 'app/services/project-transfer.service';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-project-receive-fund',
  templateUrl: './project-receive-fund.component.html',
  styleUrls: ['../project-transfer/project-transfer.component.scss']
})
export class ProjectReceiveFundComponent implements OnInit {


  form: FormGroup;
  @Input() curProject: any;
  @Input() curProjectId;
  @ViewChild('name', { static: false }) name?: ElementRef;
  @Output() saved: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private service: ProjectReceiveFundService,
    private router: Router,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.name?.nativeElement.focus();

  }
  createForm() {
    this.form = this.fb.group({
      projectId :[this.curProjectId],
      projectName : [this.curProject.projectName],
      mandateNo:['',[Validators.required]],
      receivedDate:[new Date(),[Validators.required]],
      amount:['',[Validators.required , Validators.min( 0) ]],
      description:[''],

    });
  }
  showConfirmSave() {
    if (this.form.invalid) {
      return;
    }
    this.confirmService.confirm({ title: 'Confirm', message: 'Receive Fund ( $ ' + this.form.value.amount + ' )? ' })
      .subscribe(res => {
        if (res) {
          this.save()
        } else return;
      });
  }

  save() {


    this.loader.open();

    // save
    this.service.save(this.form.value).subscribe(response => {
      this.loader.close();

      this.form.reset({ projectId: this.curProjectId, projectName: this.curProject.projectName });
      this.backToPageProject(); 
    }, err => {
      console.log(err);

      this.loader.close()
    });

  }
  backToPageProject(){
    this.saved.emit(null)
    this.router.navigateByUrl('/project/view/' + this.curProjectId);

  }


}
