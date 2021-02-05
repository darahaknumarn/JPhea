import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import { AppConfirmService } from '@ecoinsoft/core-frontend/src/lib/shared/services/app-confirm/app-confirm.service';
import { ProjectTransferService } from 'app/services/project-transfer.service';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-project-transfer',
  templateUrl: './project-transfer.component.html',
  styleUrls: ['./project-transfer.component.scss']
})
export class ProjectTransferComponent implements OnInit {
  fromProjectCtl = new FormControl();
  toProjectCtl = new FormControl();
  fromProjectStore;
  toProjectStore;
  // to Project property
  toProjectBalance :number ; 
  lastBalance : number ; 
  form: FormGroup;
  @Input() curProject: any;
  @Input() curProjectId;
  @ViewChild('name', { static: false }) name?: ElementRef;
  @Output() saved: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private service: ProjectTransferService,
    private router: Router,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.projectService.list().subscribe(res => {
      this.fromProjectStore = res.data
      this.toProjectStore = res.data
    })

    // set current project 
    this.fromProjectCtl.setValue(this.curProject);

    this.name?.nativeElement.focus();

  }
  createForm() {
    this.form = this.fb.group({
      fromProjectId: [this.curProjectId,[Validators.required]],
      fromProjectName: [this.curProject.projectName],
      toProjectId: [''],
      toProjectName: [''],
      amount: [0,[Validators.required , Validators.min(0)]],
      description: [''],
      transferType: ['Out']

    });
  }
  showConfirmSave() {
    if (this.form.invalid) {
      return;
    }
    this.confirmService.confirm({ title: 'Confirm', message: 'Transfer Balance ( $ ' + this.form.value.amount + ' ). To Project (' + this.form.value.toProjectName + ')?' })
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
     
      this.form.reset({ fromProjectId: this.curProjectId, transferType: 'Out' });
      this.toProjectCtl.reset();
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
  // -- controll Project Status
  fromProjectSelected(item) {
    this.form.patchValue({ fromProjectId: item.id, fromProjectName: item.projectName })

  }
  displayFromProject(item) {
    return item?.projectName
  }

  toProjectSelected(item) {

    this.form.patchValue({ toProjectId: item.id, toProjectName: item.projectName })
    this.toProjectBalance = item.balance; 
    this.service.getLastBalance(this.form.value.fromProjectId ,item.id ).subscribe(res=>{
      if(res.data ){
        this.lastBalance = res.data.balance 
      }else{
        this.lastBalance = 0
      }
    
    })

  }


}
