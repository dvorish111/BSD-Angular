import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from '../Services/campaign.service';
import { DonationService } from '../Services/donation.service';
import { DonateService } from '../Services/donate.service';
import { Donate } from '../Classes/Donate';
import { Campaign } from '../Classes/Campaign';
import { Subscription, interval, timer } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Directive, HostListener, ElementRef } from '@angular/core';
// import { trigger, style, animate, transition } from '@angular/animations';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { shakeCenter } from 'igniteui-angular';
import { cementMixer } from '@igniteui/material-icons-extended';
import { MatIcon } from '@angular/material/icon';

export interface slidesStore {
  id: string;
  title: string;
  src: string;
  alt: string;
  description: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit, OnDestroy {

  TotalRaised!: number;
  campaign!: Campaign;
  campaignGoul!: number;
  numChildren!: number;
  numFamily!: number;
  videoPlaying: boolean = false;
  images: slidesStore[] = [{ id: "1", title: "Ramot", src: '../../assets/images/RAMOT1.jpg', alt: './../assets/images/RAMOT2.jpg', description: "תמונה ראשונה נוף ראשוןזה תמונה של רמות בכללי התמונה הזו צולצה בשעת הבוקר של בין הערביים " }
    , { id: "2", title: "all Ramot", src: '../../assets/images/RAMOT2.jpg', alt: "./../assets/images/RAMOT2.jpg", description: "תמונה שניה נוף שני" }

  ];
  showId: boolean = false;

  hideImageId() {
    this.showId = false;
  }

  customOptions: OwlOptions = {

    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,

    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    animateOut: 'fadeOut', // הוסף אנימציה כאשר התמונה יוצאת
    animateIn: 'fadeIn' // הוסף אנימציה כאשר התמונה נכנסת
  };
  // numbers = [500000, 500, 2000, 100000];
  public isAnimationFinished: boolean = false; // Flag to determine if animation is finished
  counters = [
    { name: 'TotalRaised', current: 0, target: 500000, left: 0, top: 0 },
    { name: 'Goul', current: 0, target: 500, left: 100, top: 100 },
    { name: 'NumFamily', current: 0, target: 500, left: 500, top: 25 }, // Changed left value
    { name: 'NumChildren', current: 0, target: 2000, left: 70, top: 25 } // Changed left value
  ];
  public counterValues: { [key: string]: number } = {};
  formattedTime: string = '';
  timer: any;
  endDate!: Date;
  startDate!: Date; // התאריך שבו הקמפיין מתחיל
  timeLeftInMilliseconds!:number;
  timeOverInMilliseconds!:number;
  timeInMilliseconds!:number;
  valuetimeInMilliseconds!:number;

  constructor(public myRouter: Router, private campaignService: CampaignService, private donationService: DonationService, private donateService: DonateService) {
 
    this.startCounting();

  }

  ngOnInit(): void {
    const campaignId = 1;
    this.campaignService.getByIdCampaign(campaignId).subscribe({
      next: (campaign: Campaign) => {
        this.campaign = campaign;
        this.campaignGoul = this.campaign.goul;
        // this.destinationGoul = 500000;
        this.startDate = this.campaign.startDate;
        this.endDate = this.campaign.endDate;
        console.log(this.campaignGoul);
        this.counters[0].target = campaign.goul

      },
      error: (err) => {
        console.error(err);
      }
    });


    this.donationService.getSumDonation().subscribe
      ({
        next: (sum: number) => {
          this.TotalRaised = sum;
          console.log(this.TotalRaised);
          //this.destinationTotalRaised= 90000 ;
          this.counters[1].target = this.TotalRaised;
        },
        error: (err) => {
          console.error(err);
        }
      });

    this.donateService.getNumChildren().subscribe
      ({
        next: (numChildren: number) => {
          this.numChildren = numChildren;
          console.log(this.numChildren);
          this.counters[3].target = this.numChildren;

          // this.destinationNumChildren=1000;
        },
        error: (err) => {
          console.error(err);
        }
      });


    this.donateService.getNumFamily().subscribe
      ({
        next: (numFamily: number) => {
          this.numFamily = numFamily;
          console.log(this.numFamily);
          this.counters[2].target = this.numFamily;
          //   this.destinationNumFamily=500;
        },
        error: (err) => {
          console.error(err);
        }
      });


    // Adjust the interval as needed
    //  this.calculateIncrementStep();
    //   this.updateValues();

    this.startCountAnimations();

  }
  // calculateIncrementStep(): void {
  //   this.incrementStep = this.eliteNumbers.map(value => (value / this.maxEliteNumber) * this.totalDuration / 1000);
  // }

  // updateValues(): void {
  //   let animationComplete = false;
  //   let startTime = new Date().getTime();

  //   const updateInterval = setInterval(() => {
  //     const currentTime = new Date().getTime();
  //     const elapsedTime = currentTime - startTime;

  //     if (elapsedTime >= this.totalDuration) {
  //       this.currentValues = this.eliteNumbers.slice(); // Set current values to elite values exactly at the end
  //       animationComplete = true;
  //     } else {
  //       for (let i = 0; i < this.currentValues.length; i++) {
  //         this.currentValues[i] = Math.min(this.eliteNumbers[i], Math.floor((elapsedTime / 1000) * this.incrementStep[i]));
  //       }
  //     }

  //     if (animationComplete) {
  //       clearInterval(updateInterval);
  //       console.log("Animation complete!");
  //     }
  //   }, 1000 / 60); // 60 frames per second
  // }



  //   startAnimation(index: number) {
  //     this.animationStates[index] = 'active';
  //     setTimeout(() => {
  //       this.animationStates[index] = 'inactive';
  //     }, this.numbers[index]); // זמן ההמתנה עד סיום האנימציה
  //   }

  private startCountAnimations(): void {
    this.counters.forEach(counter => {
      this.counterValues[counter.name] = 0;
    });

    this.counters.forEach(counter => {
      const interval = setInterval(() => {
        if (this.counterValues[counter.name] < counter.target) {
          this.counterValues[counter.name]++;
        } else {
          clearInterval(interval);
          if (this.counters.every(item => this.counterValues[item.name] === item.target)) {
            this.isAnimationFinished = true;
          }
        }
      }, 500);
    });
  }
  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async startCounting(): Promise<void> {
    await Promise.all(this.counters.map(counter => this.startInterval(counter)));
  }

  async startInterval(counter: any): Promise<void> {
    const increment = counter.target / 1000;
    while (counter.current < counter.target) {
      await this.delay(1); // Adjust the interval as needed
      counter.current += increment;
    }




    this.startTimer();
  }


  playVideo(videoPlayer: HTMLVideoElement) {
    if (!this.videoPlaying) {
      videoPlayer.play();
      videoPlayer.classList.add('video-playing'); // הוספת קלאס "video-playing"
      this.videoPlaying = true;
    } else {
      videoPlayer.pause();
      videoPlayer.classList.remove('video-playing'); // הסרת קלאס "video-playing"
      this.videoPlaying = false;
    }
  }
  startTimer(): void {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    const updateTimer = () => {
      const now = new Date().getTime();
      this.timeLeftInMilliseconds = endDate.getTime() - now;
      this.timeOverInMilliseconds=endDate.getTime()-startDate.getTime()- this.timeLeftInMilliseconds ;
      this.timeInMilliseconds=endDate.getTime()-startDate.getTime();
      this.valuetimeInMilliseconds=this.timeOverInMilliseconds/this.timeInMilliseconds*100;
      if (this.timeLeftInMilliseconds <= 0) {
        this.formattedTime = '00:00:00:00';
      } else {
        const days = Math.floor(this.timeLeftInMilliseconds / (1000 * 60 * 60 * 24));
        const hours = Math.floor((this.timeLeftInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((this.timeLeftInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((this.timeLeftInMilliseconds % (1000 * 60)) / 1000);
        this.formattedTime = `${this.padNumber(days)}:${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
        this.timer = setTimeout(updateTimer, 1000);
      }
    };

    updateTimer();
  }

  padNumber(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }


  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}