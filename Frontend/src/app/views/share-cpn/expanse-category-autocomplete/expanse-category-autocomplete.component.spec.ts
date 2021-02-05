import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpanseCategoryAutocompleteComponent } from './expanse-category-autocomplete.component';

describe('ExpanseCategoryAutocompleteComponent', () => {
  let component: ExpanseCategoryAutocompleteComponent;
  let fixture: ComponentFixture<ExpanseCategoryAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpanseCategoryAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpanseCategoryAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
