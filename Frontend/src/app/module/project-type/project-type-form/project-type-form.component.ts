import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectTypeService } from 'app/services/project-type.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import { EnumerationType } from 'app/model/enum/enumeration-type';

@Component({
  selector: 'app-project-type-form',
  templateUrl: './project-type-form.component.html',
  styleUrls: ['./project-type-form.component.scss']
})
export class ProjectTypeFormComponent implements OnInit {

  form: FormGroup;
  isLoading: Boolean = false;
  recId: number;
  @ViewChild('name', { static: false }) name?: ElementRef;

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private service: ProjectTypeService,
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
      eType: [EnumerationType.PROJECTTYPE],
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
        this.router.navigateByUrl('/project-type');
      });
    }else{// save
      this.service.save(this.form.value) .subscribe(response => {
        this.isLoading = false;
        this.router.navigateByUrl('/project-type');
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

