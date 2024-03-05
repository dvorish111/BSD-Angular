import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportingDonationsAndContributionsComponent } from './exporting-donations-and-contributions.component';

describe('ExportingDonationsAndContributionsComponent', () => {
  let component: ExportingDonationsAndContributionsComponent;
  let fixture: ComponentFixture<ExportingDonationsAndContributionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportingDonationsAndContributionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportingDonationsAndContributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
