import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppLoaderService } from '@ecoinsoft/core-frontend/src/lib/component/app-loader/app-loader.service';
import { Environment } from '@ecoinsoft/core-frontend/src/lib/environments/environment';
import { configuration } from '@ecoinsoft/core-frontend/src/lib/module/configuration/configuration.routing';
import { AppConfirmService } from '@ecoinsoft/core-frontend/src/lib/shared/services/app-confirm/app-confirm.service';
import { ConfigurationService } from '@ecoinsoft/core-frontend/src/public-api';
import { ApiEndpoint } from 'app/model/enum/api-endpoint';
import { EmployeeService } from 'app/services/employee.service';
import { ExpanseItemService } from 'app/services/expanse-item.service';
import { ProjectExpanseService } from 'app/services/project-expanse.service';
import { ProjectPrintExpanseComponent } from '../project-print-expanse/project-print-expanse.component';

@Component({
  selector: 'app-project-expanse',
  templateUrl: './project-expanse.component.html',
  styleUrls: ['../project-transfer/project-transfer.component.scss']
})
export class ProjectExpanseComponent implements OnInit {

  form: FormGroup;
  @Input() curProject: any;
  @Input() curProjectId;
  @ViewChild('name', { static: false }) name?: ElementRef;
  @Output() saved: EventEmitter<any> = new EventEmitter();
  expanseItemCtl = new FormControl();
  approvedCtl = new FormControl();
  verifiedCtl = new FormControl();
  certifiedCtl = new FormControl();
  submittedCtl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private service: ProjectExpanseService,
    private router: Router,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    public expanseItemService: ExpanseItemService, 
    public employeeService : EmployeeService, 
    public printDialog: MatDialog,
    private env : Environment , 
    private configureService : ConfigurationService
  ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.name?.nativeElement.focus();
    this.expanseItemService.listData();
    this.employeeService.listData();
    this.expanseItemCtl.valueChanges.subscribe(value => {
      this.expanseItemService.listData(value);
    });
    this.approvedCtl.valueChanges.subscribe(value => {
      this.employeeService.listData(value);
    });
    this.verifiedCtl.valueChanges.subscribe(value => {
      this.employeeService.listData(value);
    });
    this.certifiedCtl.valueChanges.subscribe(value => {
      this.employeeService.listData(value);
    });
    this.submittedCtl.valueChanges.subscribe(value => {
      this.employeeService.listData(value);
    });
    // this.openPrintDialog(1);\
    // load Approver configure 
    this.loadApproverConfigure()
  }

  loadApproverConfigure(){
    this.configureService.getConfigByname("ExpanseApprover").subscribe(res=>{
      let data = JSON.parse(res.data.value)
      this.employeeService.get(data.approveById).subscribe(res=>{
       this.approvedCtl.setValue(res.data)
       this.selectedApproved(res.data)
        
      })
      this.employeeService.get(data.certifiedById).subscribe(res=>{
        this.certifiedCtl.setValue(res.data)
        this.selectedCertify(res.data)
         
       })
       this.employeeService.get(data.submittedById).subscribe(res=>{
        this.submittedCtl.setValue(res.data)
        this.selectedSubmit(res.data)
         
       })
       this.employeeService.get(data.verifiedById).subscribe(res=>{
        this.verifiedCtl.setValue(res.data)
        this.selectedVerify(res.data)
         
       })
//       approveById: "1"
// certifiedById: "2"
// submittedById: "4"
// verifiedById: "3"
    }

    )
  }
  createForm() {
    this.form = this.fb.group({
      projectId: [this.curProjectId],
      projectName: [this.curProject.projectName],
      accountNo: [this.curProject.accountNo],
      bankName: [this.curProject.bankName],
      source: [this.curProject.source],
      requester: ['',[Validators.required , Validators.maxLength(255)]],
      address: ['',[Validators.required]],
      expanseDate: [ new Date() , [Validators.required]],
      expanseItemId: [''],
      expanseItemName: [''],
      paymentOptions: ['Cheque'],
      chequeNo: [''],
      amount: ['' , [Validators.required , Validators.min(0)]],
      amountInWord: ['',[Validators.required]],
      receiptFrom: ['',[ Validators.maxLength(255)]],
      referenceDescription: [''],
      paymentFor: ['',[Validators.required , Validators.maxLength(255)]],
      liquidationNo: ['', [Validators.min(0)]],
      requestAmount: ['', [Validators.min(0)]],
      liquidationAmount: ['', [Validators.min(0)]],
      note: [''],
      isLiquidation: [false],


     approveById:[],
     approveByName:[],
     approvedByPosition:[],

     certifiedById:[],
     certifiedByName:[],
     certifiedByPosition:[],
     verifiedById:[],
     verifiedByName:[],
     verifiedByPosition:[],
     submittedById:[],
     submittedByName:[],
     submittedByPosition:[],

    });
  }
  showConfirmSave() {
    if (this.form.invalid) {
      return;
    }
    this.confirmService.confirm({ title: 'Confirm', message: 'Expnase amount:  ( $ ' + this.form.value.amount + ' )? ' })
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

      this.form.reset({
        projectId: this.curProjectId,
        projectName: this.curProject.projectName,
        paymentOptions: "Credit"
      });
      this.expanseItemCtl.reset();
      this.backToPageProject();
      this.openPrintDialog(response.data.id);
      this.loadApproverConfigure(); 
    }, err => {
      console.log(err);

      this.loader.close()
    });

  }
  openPrintDialog(expanseId):void{
    const dialogRef = this.printDialog.open(ProjectPrintExpanseComponent, {
      width: '350px',
      data: {expanseId : expanseId }
    });

    dialogRef.afterClosed().subscribe(result => {
      let params = "?id="+result.id+"&printAdvanceVoucher="+result.printAdvanceVoucher+"&printExpanse="+result.printExpanse
      +"&printLiquidation="+result.printLiquidation+"&printRequestExpanse="+result.printRequestExpanse ; 
let token = 
window.open(this.env.serverUrl+'/expanse/print'+params, "_blank");
      
    
    });

  }
  backToPageProject() {
    this.saved.emit(null)
    this.router.navigateByUrl('/project/view/' + this.curProjectId);

  }


  // --Controll Expanse Item
  selectedExpanseItem(item) {
    this.form.patchValue({ expanseItemName: item.name, expanseItemId: item.id })

  }
  displayExpanseItem(item) {
    return item?.name
  }
  displayApproved(item) {
    return item?.name
  }

  selectedApproved(item) {
    this.form.patchValue({ approveById: item.id, approveByName: item.name , approvedByPosition: item.position })

  }
  selectedVerify(item) {
    this.form.patchValue({ verifiedById: item.id, verifiedByName: item.name , verifiedByPosition: item.position })

  }
  selectedSubmit(item) {
    this.form.patchValue({ submittedById: item.id, submittedByName: item.name , submittedByPosition: item.position })

  }

  selectedCertify(item) {
    this.form.patchValue({ certifiedById: item.id, certifiedByName: item.name , certifiedByPosition: item.position })

  }


  toggleReqeustAmount(isChecked){
    console.log(isChecked);
    
    if(isChecked){

    }else{

    }

  }

}
