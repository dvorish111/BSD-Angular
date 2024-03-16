import { Component, Input } from '@angular/core';
import { DonateService } from 'src/app/Services/donate.service';
import { DonationService } from 'src/app/Services/donation.service';

@Component({
  selector: 'app-exporting-donations-and-contributions',
  templateUrl: './exporting-donations-and-contributions.component.html',
  styleUrls: ['./exporting-donations-and-contributions.component.css']
})
export class ExportingDonationsAndContributionsComponent {

  // @Input() iconText:string;
  @Input() text: string | undefined;
  @Input() exportingTipe: string | undefined;

  constructor(private donateService: DonateService, private donationService: DonationService) { }
  downloadDonatesCSV()//הורדת קובץ נתרמים
  {
    if (this.exportingTipe === 'donate') {
      console.log("exportingTipe", this.exportingTipe);
      this.donateService.getDonatesByExcel().subscribe(
        (blob: Blob) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'רשימת נתרמים.csv';
          link.click();
          console.log(blob);
        },
        (error) => {
          console.error(error);
        }
      );

    }
    if (this.exportingTipe === 'donation') {
      console.log("exportingTipe", this.exportingTipe);

      this.donationService.getDonationsByExcel().subscribe(
        (blob: Blob) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'רשימת תרומות.csv';
          link.click();
          console.log(blob);
        },
        (error) => {
          console.error(error);
        }
      );

    }
  }
  // downloadDonationsCSV()//הורדת קובץ תרומות
  // {
  //   if (this.exportingTipe === 'donation') {
  //     console.log("exportingTipe", this.exportingTipe);

  //     this.donationService.getDonationsByExcel().subscribe(
  //       (blob: Blob) => {
  //         const link = document.createElement('a');
  //         link.href = window.URL.createObjectURL(blob);
  //         link.download = 'רשימת תרומות.csv';
  //         link.click();
  //         console.log(blob);
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );

  //   }

  // }
}
