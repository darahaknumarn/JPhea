import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFinanceTransactionComponent } from './project-finance-transaction.component';

describe('ProjectFinanceTransactionComponent', () => {
  let component: ProjectFinanceTransactionComponent;
  let fixture: ComponentFixture<ProjectFinanceTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFinanceTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFinanceTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
