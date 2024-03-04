import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFamiliesComponent } from './admin-families.component';

describe('AdminFamiliesComponent', () => {
  let component: AdminFamiliesComponent;
  let fixture: ComponentFixture<AdminFamiliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFamiliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
