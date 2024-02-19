import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef, HostListener, ElementRef, OnDestroy } from '@angular/core';
import { CampaignService } from '../Services/campaign.service';
import { Campaign } from '../Classes/Campaign';
import { FamiliesComponent } from '../families/families.component';
import { DonationService } from '../Services/donation.service';
import { DonateService } from '../Services/donate.service';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, interval , timer} from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit,OnDestroy {
  campaign!: Campaign;
  campaignGoul!: number;
  TotalRaised!: number;
  TotalRaisedPercentages!: number;
  campaignLoaded!: boolean;
  sumLoaded!: boolean;
  numFamily!: number;
  donationAmount!: number;
  isSticky: boolean = false;
  isCollapsed = false;
  radius: number = 50;
  circumference: number = 2 * Math.PI * this.radius;
  timerSubscription!: Subscription ;
  progress: number=0;

  constructor(private cdr: ChangeDetectorRef, private campaignService: CampaignService, private donationService: DonationService, private donateService: DonateService,private el: ElementRef) {


  }




  ngOnInit(): void {
    const campaignId = 1;
    this.campaignLoaded = false;
    this.sumLoaded = false;

    // Set up flags to track the completion of server calls


    // Make the first server call
    this.campaignService.getByIdCampaign(campaignId).subscribe({
      next: (campaign: Campaign) => {
        this.campaign = campaign;
        this.campaignGoul = this.campaign.goul;
        console.log(this.campaignGoul);

        // Set the flag to true when the first server call is complete
        this.campaignLoaded = true;

        // Call the callback function
        this.checkBothLoaded();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });

    // Make the second server call
    this.donationService.getSumDonation().subscribe({
      next: (sum: number) => {
        this.TotalRaised = sum;
        console.log(this.TotalRaised);
        // Set the flag to true when the second server call is complete
        this.sumLoaded = true;
        // Call the callback function
      //  this.checkBothLoaded();
         this.caunterRaised()
        this.cdr.detectChanges();
       
      },
      error: (err) => {
        console.error(err);
      }
    });
    this.donateService.getNumFamily().subscribe
      ({
        next: (numFamily: number) => {

          this.numFamily = numFamily;
          this.cdr.detectChanges();
          console.log(this.numFamily);
        },
        error: (err) => {
          console.error(err);
        }
      });

    this.donationService.donationAmount$.subscribe(amount => {
      this.TotalRaised  = amount;
      // Handle the service data change here
      this.TotalRaisedPercentagesCalculation();
      console.log('Service data changed:',  this.TotalRaised );
      this.cdr.detectChanges();
    });
  
  
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  caunterRaised(){
    this.TotalRaisedPercentages= this.TotalRaisedPercentagesCalculation()
    this.cdr.detectChanges();
    const targetValue =  this.TotalRaisedPercentages; // ערך היעד
    const animationDuration = 5000; // משך זמן האנימציה במילישניות
    const steps =  this.TotalRaisedPercentages ; // מספר השלבים באנימציה
    const stepSize = targetValue /steps;
    const intervalTime = animationDuration /steps;

    const timer = interval(intervalTime);
    this.timerSubscription = timer.subscribe(() => {
      if (this.progress < targetValue) {
        this.progress += stepSize;
      } else {
        
        this.timerSubscription.unsubscribe(); // להפסיק את האינטרוול
      }
    });
    this.cdr.detectChanges();
  }
  checkBothLoaded() {
    // Check if both server calls have finished
    if (this.campaignLoaded && this.sumLoaded) {
      // Call the calculation function
      this.cdr.detectChanges();
      this.TotalRaisedPercentagesCalculation();
    }
  }

  TotalRaisedPercentagesCalculation()
   {   this.cdr.detectChanges();
    if((this.TotalRaised / this.campaignGoul) * 100<100){
    this.TotalRaisedPercentages = (this.TotalRaised / this.campaignGoul) * 100;}
    else{ this.TotalRaisedPercentages =110}
    return  this.TotalRaisedPercentages;
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isSticky = scrollPosition > this.el.nativeElement.offsetTop;
  }

  calculateDashOffset(): number {
    const percentage = 80 / 100;
    return this.circumference * (1 - percentage);
  }

  
}    