/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Page-404Component } from './page-404.component';

describe('Page-404Component', () => {
  let component: Page-404Component;
  let fixture: ComponentFixture<Page-404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Page-404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Page-404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
