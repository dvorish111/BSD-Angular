import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignApprovalComponent } from './new-campaign-approval.component';

describe('NewCampaignApprovalComponent', () => {
  let component: NewCampaignApprovalComponent;
  let fixture: ComponentFixture<NewCampaignApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCampaignApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCampaignApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
