import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectStatusService } from 'app/services/project-status.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import { EnumerationType } from 'app/model/enum/enumeration-type';

@Component({
  selector: 'app-project-status-form',
  templateUrl: './project-status-form.component.html',
  styleUrls: ['./project-status-form.component.scss']
})
export class ProjectStatusFormComponent implements OnInit {

  form: FormGroup;
  isLoading: Boolean = false;
  recId: number;
  @ViewChild('name', { static: false }) name?: ElementRef;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private service: ProjectStatusService,
    private router: Router,
    private route: ActivatedRoute,
    private loader: AppLoaderService)
    { }

  ngOnInit() {
    this.recId = this.route.snapshot.params['id'];
    this.createForm();

    if (this.recId){
      this.showFormEdit();
    }

    //focus field name
    this.cd.detectChanges();
    this.name.nativeElement.focus();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['',  Validators.required],
      isActive: [true],
      isDefault: [false],
      eType: [EnumerationType.PROJECTSTATUS],
      description: ['']
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if( this.recId){ // update
      this.service.update( this.recId, this.form.value) .subscribe(response => {
        this.isLoading = false;
        this.router.navigateByUrl('/project-status');
      });
    }else{// save
      this.service.save(this.form.value) .subscribe(response => {
        this.isLoading = false;
        this.router.navigateByUrl('/project-status');
      });
    };


  }

  showFormEdit(){
    this.loader.open();
    this.service.get(this.recId)
    .subscribe(res => {
      this.form.patchValue(res.data);
      this.loader.close();
    });
  }

}

