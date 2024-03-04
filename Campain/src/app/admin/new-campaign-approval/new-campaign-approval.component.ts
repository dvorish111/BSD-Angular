import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-campaign-approval',
  templateUrl: './new-campaign-approval.component.html',
  styleUrls: ['./new-campaign-approval.component.css']
})
export class NewCampaignApprovalComponent {
  @Output() closeDialog = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<NewCampaignApprovalComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
