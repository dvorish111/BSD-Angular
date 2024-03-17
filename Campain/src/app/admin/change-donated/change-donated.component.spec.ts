import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDonatedComponent } from './change-donated.component';

describe('ChangeDonatedComponent', () => {
  let component: ChangeDonatedComponent;
  let fixture: ComponentFixture<ChangeDonatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDonatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeDonatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
