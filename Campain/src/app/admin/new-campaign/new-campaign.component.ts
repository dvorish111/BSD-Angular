import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCampaignApprovalComponent } from '../new-campaign-approval/new-campaign-approval.component';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.css']
})
export class NewCampaignComponent {


  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(NewCampaignApprovalComponent, {
      width: '600px',
      data: { message: 'Are you sure you want to click?' }
    });

    dialogRef.componentInstance.closeDialog.subscribe(() => {
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Perform the action when user confirms
        console.log('User confirmed the action');
      } else {
        // Perform any action when user cancels
        console.log('User canceled the action');
      }
    });
  }


}
