import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ProjectService } from 'app/services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import { ProjectTypeService } from 'app/services/project-type.service';
import { ProjectStatusService } from 'app/services/project-status.service';
import { Environment, IRequestOptions, SecUser, SecUserService, UserService } from '@ecoinsoft/core-frontend/src/public-api';
import { HttpParams } from '@angular/common/http';
import { FileItem, FileUploader, Headers } from 'ng2-file-upload';
import { CredentialsService } from '@ecoinsoft/core-frontend/src/lib/authentication/credentials.service';
import { IProject, IProjectFile } from 'app/model/project';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  form: FormGroup;
  isLoading: Boolean = false;
  recId: number;
  projectRec:IProject={projectFile:[]};
  @ViewChild('name', { static: false }) name?: ElementRef;


  uploader: FileUploader = new FileUploader({
    url: this.environment.serverUrl + '/api/dynamicFileupload',
    authToken: 'Bearer ' + this.cred.credentials.token ,
    headers:[{ name : 'X-API-KEY' , value : this.environment.xApiKey }],
    additionalParameter:{
      uploadType: "file-upload-type-config"
    }
  });
  hasBaseDropZoneOver: boolean = false;
  projectTypeCtl = new FormControl();
  projectStatusCtl = new FormControl();
  users: [SecUser];

  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private service: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private loader: AppLoaderService,
    public projectTypeService: ProjectTypeService,
    public projectStatusService: ProjectStatusService,
    public secUserService: UserService,
    private environment: Environment,
    private cred: CredentialsService
  ) { }

  ngOnInit() {
    this.recId = this.route.snapshot.params['id'];
    this.createForm();

    if (this.recId) {
      this.showFormEdit();
    }else{
      // load defualt status
      this.projectStatusService.getDefaultStatus().subscribe(res=>{
        this.selectedProjectStatus(res.data)
        this.projectStatusCtl.setValue(res.data)
        
      })
      this.projectTypeService.getDefault().subscribe(res=>{
        this.selectedProjectType(res.data)
        this.projectTypeCtl.setValue(res.data)
        
      })


    }

    //focus field name
    this.cd.detectChanges();
    this.name.nativeElement.focus();
    this.projectStatusService.listData();
    this.projectTypeService.listData();
    this.listSecUser();
    this.uploader.response.subscribe(rec =>{
      let dataJson =JSON.parse(rec); 
      this.uploadedFile(dataJson.data[0])
      
    })
    // detect on autocomplete change
    this.projectStatusCtl.valueChanges.subscribe(value => {
      this.projectStatusService.listData(value)
    })
    this.projectTypeCtl.valueChanges.subscribe(value => {
      this.projectTypeService.listData(value);
    })
    this.form.get('responsibleBy').valueChanges.subscribe(value => {
      this.listSecUser(value)
    })

  }

  createForm() {
    this.form = this.fb.group({
      projectName: ['', [Validators.required]],
      accountNo: ['', [Validators.required]],
      bankName: ['National Bank of Cambodia', [Validators.required]],
      projectTypeId: ['', [Validators.required]],
      projectTypeName: ['', [Validators.required]],
      responsibleBy: [''],
      refNo: [''],
      source: [''],
      startDate: [new Date()],
      complete: ['', [Validators.min(0), Validators.max(100)]],
      statusId: [''],
      statusName: [''],
      description: [''], 



    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    this.form.value.projectFile = this.projectRec.projectFile;

    if (this.recId) { // update
      this.service.update(this.recId, this.form.value).subscribe(response => {
        this.isLoading = false;
        this.router.navigateByUrl('/project');
      });
    } else {// save
      this.service.save(this.form.value).subscribe(response => {
        this.isLoading = false;
        this.router.navigateByUrl('/project');
      });
    };


  }

  showFormEdit() {
    this.loader.open();
    this.service.get(this.recId)
      .subscribe(res => {
        this.form.patchValue(res.data);
        this.projectRec  = res.data as IProject;
        this.projectRec.projectFile.forEach(element => {

          console.log("element", element);
          
          this.addFileToUploaderQueue(element)
        });
        this.loader.close();
      });
  }

  // --Controll Project Type
  selectedProjectType(item) {
    this.form.patchValue({ projectTypeName: item.name, projectTypeId: item.id })

  }
  displayProjectType(item) {
    return item?.name
  }
  // -- controll Project Status
  selectedProjectStatus(item) {
    this.form.patchValue({ statusName: item.name, statusId: item.id })

  }
  displayProjectStatus(item) {
    return item?.name
  }

  // -- controll secUser 
  listSecUser(name?) {


    let option: IRequestOptions = {};
    if (name) {
      let params = new HttpParams().set('name', name);
      option.params = params
    }
    this.secUserService.list(option).subscribe(data => {
      this.users = data.data
    })

  }
  displayUser(option) {
    if (option) {
      return option?.firstName + ' ' + option?.lastName
    }

  }

// --- controll file upload 
  
  public uploadFile(e: any): void {
    this.hasBaseDropZoneOver = e;
    // file upload 

    this.uploader.uploadAll();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;   
  }
  removeFile(file : FileItem){
    file.remove();
    this.projectRec.projectFile.forEach( (item, index) => {
      
      if(item.name === file.formData.name){ 
        this.projectRec.projectFile.splice(index,1)
        
      };
    });
  }
  // add to project file storage
  uploadedFile(rec){
    
   
    for( let i in this.uploader.queue){
      let f =  this.uploader.queue[i]; 

        
      if(f.file.name === rec.originalFileName){
        console.log("--- set form data ");
        
        f.formData = this.mapFileStorageToProjectFile(rec)

        this.projectRec.projectFile.push( f.formData );
        
        break;
      };
      
    }
  }
  goToLink(url){    
    window.open(url, "_blank");
  }
  private mapFileStorageToProjectFile(rec){
      let data = {
        name:rec.originalFileName,
        size:rec.fileSize,
        fileUrl:rec.fileUrl,
        fileStorageId:rec.id,
        uploadBy:rec.uploadBy,
      } 
      return data
  }
  addFileToUploaderQueue(rec:any){
    let f =new FileItem(this.uploader , {name:rec.name , size : rec.size} as File , null ); 
    f.file.name = rec.name 
    f.isSuccess =true 
    f.file.size =rec.size
    f.formData = rec 
    this.uploader.queue.push(f)
  }
}

