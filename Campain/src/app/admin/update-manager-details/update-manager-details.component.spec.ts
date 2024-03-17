import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManagerDetailsComponent } from './update-manager-details.component';

describe('UpdateManagerDetailsComponent', () => {
  let component: UpdateManagerDetailsComponent;
  let fixture: ComponentFixture<UpdateManagerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateManagerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateManagerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
