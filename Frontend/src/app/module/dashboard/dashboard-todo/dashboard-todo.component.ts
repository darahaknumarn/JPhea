import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CredentialsService } from '@ecoinsoft/core-frontend/src/lib/authentication/credentials.service';
import { MessageService } from '@ecoinsoft/core-frontend/src/public-api';
import { TodoService } from 'app/services/todo.service';

@Component({
  selector: 'app-dashboard-todo',
  templateUrl: './dashboard-todo.component.html',
  styleUrls: ['./dashboard-todo.component.scss']
})
export class DashboardTodoComponent implements OnInit {

  todoList=[] ; 
  form: FormGroup;

  constructor(public service : TodoService,
    private credService : CredentialsService ,
    private msg : MessageService,
    private fb: FormBuilder ){ 
      this.createForm()
  }

  ngOnInit(): void {
    this.service.search()
  }
  createForm() {
    this.form = this.fb.group({
     title:['' , Validators.maxLength(255)], 
     username :[this.credService.credentials.username]
    });
  }
  showFormDetail(id){
    alert(id)
  }
  updateTaskList(id , isComplete){
    this.service.update(id , {isClosed:true } ).subscribe(res=>{
      this.msg.success("Task completed");
      this.service.search();
      this.playAudio();
  })
    
  }
  updateImportant(id , value ){
    this.service.update(id , {isImportant: !value} ).subscribe(res=>{
        this.msg.success("Update task success");       
        this.service.search();
    })
  }
  setDueDate(type: string, event: MatDatepickerInputEvent<Date> , id) {
    this.service.update(id , {dueDate: event.value} ).subscribe(res=>{
      this.msg.success("Update task success");       
      this.service.search();
  })
  }
  save(){
    if (this.form.invalid) {
      return;
    }
    this.service.save(this.form.value) .subscribe(response => {     
      this.service.search()
      this.form.patchValue({title:''})
    });
  }
  playAudio(){
    let audio = new Audio();
    audio.src = "../../../../assets/sound/complete.m4a";
    audio.load();
    audio.play();
  }
}
