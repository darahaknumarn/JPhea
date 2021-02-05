import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '@ecoinsoft/core-frontend/src/lib/authentication/credentials.service';
import { ProjectCommentService } from 'app/services/project-comment.service';

@Component({
  selector: 'app-project-comment',
  templateUrl: './project-comment.component.html',
  styleUrls: ['./project-comment.component.scss']
})
export class ProjectCommentComponent implements OnInit {

  form: FormGroup;
  isLoading: Boolean = false;
  @Input() projectId: string;
  commentList:[]; 
  constructor(
    private fb: FormBuilder,
    private service: ProjectCommentService, 
    private cred: CredentialsService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.listComment();
  }
  listComment() {
    let p = new HttpParams().append('projectId' , this.projectId).append('order' , 'desc'); 

   this.service.list({params:p}).subscribe(data=>{
     this.commentList = data.data
   })
  }
  createForm() {
    this.form = this.fb.group({
      comment: ['', [Validators.required]],
      projectId:[this.projectId],
      createdBy:[this.cred.credentials.id]
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;


    this.service.save(this.form.value).subscribe(response => {
      this.isLoading = false;
      this.listComment();
      this.form.get('comment').setValue('')

    });



  }
}
