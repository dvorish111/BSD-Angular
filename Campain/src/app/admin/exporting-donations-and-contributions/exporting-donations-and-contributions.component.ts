import { Component, Input, OnInit } from '@angular/core';
import { Neighborhood } from 'src/app/Classes/Neighborhood';
import { DonateService } from 'src/app/Services/donate.service';
import { DonationService } from 'src/app/Services/donation.service';
import { NeighborhoodService } from 'src/app/Services/neighborhood.service';

@Component({
  selector: 'app-exporting-donations-and-contributions',
  templateUrl: './exporting-donations-and-contributions.component.html',
  styleUrls: ['./exporting-donations-and-contributions.component.css']
})
export class ExportingDonationsAndContributionsComponent  implements OnInit{

  // @Input() iconText:string;
  @Input() text: string | undefined;
  @Input() exportingTipe: string | undefined;
  selectedNeighborhood!:number;
  neighborhoods!:Neighborhood[];
  constructor( private neighborhoodService:NeighborhoodService,private donateService: DonateService, private donationService: DonationService) { }

  // constructor( private donateService: DonateService,private donationService: DonationService,private renderer: Renderer2,private route:Router,private activatedRoute:ActivatedRoute,private neighborhoodService:NeighborhoodService, private donorService:DonorService) { }
  
  
ngOnInit(){
  this.getAllNeighborhoods();

}
  getAllNeighborhoods() {
      this.neighborhoodService.getAllNeighborhoods().subscribe
    ({
      next: (neighborhood:Neighborhood[]) => {
        this.neighborhoods = neighborhood;
        console.log(this.neighborhoods);

      },
      error: (err) => {
        console.error(err);
      }
    });
  }
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
