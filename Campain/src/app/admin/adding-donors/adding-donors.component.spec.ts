import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingDonorsComponent } from './adding-donors.component';

describe('AddingDonorsComponent', () => {
  let component: AddingDonorsComponent;
  let fixture: ComponentFixture<AddingDonorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingDonorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingDonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
