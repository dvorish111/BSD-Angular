import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDonationsComponent } from './show-donations.component';

describe('ShowDonationsComponent', () => {
  let component: ShowDonationsComponent;
  let fixture: ComponentFixture<ShowDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDonationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
