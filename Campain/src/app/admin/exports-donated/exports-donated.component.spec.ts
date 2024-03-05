import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportsDonatedComponent } from './exports-donated.component';

describe('ExportsDonatedComponent', () => {
  let component: ExportsDonatedComponent;
  let fixture: ComponentFixture<ExportsDonatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportsDonatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportsDonatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
