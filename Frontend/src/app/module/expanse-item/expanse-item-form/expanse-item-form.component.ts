import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ExpanseItemService } from 'app/services/expanse-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import { EnumerationType } from 'app/model/enum/enumeration-type';
import { ExpanseItemTypeService } from 'app/services/expanse-item-type.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expanse-item-form',
  templateUrl: './expanse-item-form.component.html',
  styleUrls: ['./expanse-item-form.component.scss']
})
export class ExpanseItemFormComponent implements OnInit {

  form: FormGroup;
  isLoading: Boolean = false;
  recId: number;
  @ViewChild('name', { static: false }) name?: ElementRef;
  expTypeCtl = new FormControl();
  filteredOptions: Observable<string[]>;
  constructor(
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private service: ExpanseItemService,
    private router: Router,
    private route: ActivatedRoute,
    private loader: AppLoaderService, 
    public expTypeService : ExpanseItemTypeService
    )
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
    // load selection 
    this.expTypeService.listData();
  }

  createForm() {
    this.form = this.fb.group({
      dateCreated:[''],
      description:[''],
      expTypeId:['',  Validators.required],
      expTypeName:['',  Validators.required],
      lastUpdated:[''],
      name:['', Validators.required],

      
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
        this.router.navigateByUrl('/expanse-item');
      });
    }else{// save
      this.service.save(this.form.value) .subscribe(response => {
        this.isLoading = false;
        this.router.navigateByUrl('/expanse-item');
      });
    };


  }

  showFormEdit(){
    this.loader.open();
    this.service.get(this.recId)
    .subscribe(res => {
      this.form.patchValue(res.data);
      this.expTypeCtl.setValue({name : res.data.expTypeName })
      this.loader.close();
    });
  }
  selectedExpanse(item){
     this.form.patchValue({expTypeName:item.name , expTypeId :item.id})
      
  }

  // controls event 
  displayExpanseType(item){
    return item?.name
  }
 

}

