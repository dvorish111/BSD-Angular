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

export interface slidesStore{
  id:string;
  title:string;
  src:string;
  alt:string;
  description:string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent implements OnInit, OnDestroy{
 
  TotalRaised!:number;
  campaign!: Campaign;
  campaignGoul!: number;
  numChildren!:number;
  numFamily!:number;
  timerSubscription!: Subscription ;
  // carouselOptions = {
  //   loop: true,
  //   autoplay: true,
  //   autoplayTimeout: 3000,
  //   autoplayHoverPause: true
  // };
  images:slidesStore[]=[{id:"1",title:"Ramot",src:'../../assets/images/RAMOT1.jpg',alt:'./../assets/images/RAMOT2.jpg',description:"תמונה ראשונה נוף ראשון"}
     ,{id:"2",title:"all Ramot",src: '../../assets/images/RAMOT2.jpg',alt:"./../assets/images/RAMOT2.jpg",description:"תמונה שניה נוף שני"}
   
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
  

  
  currentGoul = 0;
  destinationGoul = this.campaignGoul;
  currentTotalRaised=0;
  destinationTotalRaised:number=this.TotalRaised;
  currentNumChildren=0
  currentNumFamily=0
  destinationNumChildren:number= this.numChildren
  destinationNumFamily:number=this.numFamily

  TotalRaised1 = 0;
  campaignGoul1 = 0;
  NumChildren1 = 0;
  NumFamily1 = 0;
  // eliteNumbers: number[] = [1337, 24601, 777, 9000]; // Example elite numbers
  // currentValues: number[] = [0, 0, 0, 0];
  // incrementStep: number[] = [];
  // maxEliteNumber!: number;
  // totalDuration: number = 3000; // Total duration for all numbers to reach their elite values (in milliseconds)

  // numbers = [500000, 500, 2000, 100000];


  // animationStates = ['inactive', 'inactive', 'inactive', 'inactive'];

  public isAnimationFinished: boolean = false; // Flag to determine if animation is finished
  counters = [
    { name: 'TotalRaised', current: 0, target: 500000, left: 0, top: 0 },
    { name: 'Goul', current: 0, target: 100000, left: 100, top: 100 },
    { name: 'NumFamily', current: 0, target: 500, left: 500, top: 25 }, // Changed left value
    { name: 'NumChildren', current: 0, target: 2000, left: 70, top: 25 } // Changed left value
  ];
  public counterValues: { [key: string]: number } = {};


  // timeLeft: string = '';
  // interval: any;
  // StartDate: Date = new Date('2024-02-18T08:00:00');
  // allowedTimeInMinutes: number = 60; // זמן הקמפיין בדקות
  timeLeft: string = '';
  timer: any;

  // הגדרת תאריך ההתחלה ומשך הזמן בדקות

  
  startDate: Date = new Date('2024-02-01T08:00:00'); // התאריך שבו הקמפיין מתחיל
  durationInMinutes: number = 6000; // משך זמן הקמפיין בדקות

  constructor(public myRouter: Router, private campaignService: CampaignService,private donationService:DonationService,private donateService:DonateService) {
   // this.maxEliteNumber = Math.max(...this.eliteNumbers);
   this.startCounting();

  }

  ngOnInit(): void {
    const campaignId = 1;
    this.campaignService.getByIdCampaign(campaignId).subscribe({
      next: (campaign: Campaign) => {
        this.campaign = campaign;
        this.campaignGoul = this.campaign.goul;
        this.destinationGoul = 500000;
        console.log(this.campaignGoul);

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
        this.destinationTotalRaised= 90000 ;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.donateService.getNumChildren().subscribe
    ({
      next: (numChildren:number) => {       
        this.numChildren =numChildren ;        
        console.log(this.numChildren);
        this.destinationNumChildren=1000;
      },
      error: (err) => {
        console.error(err);
      }
    });


    this.donateService.getNumFamily().subscribe
    ({
      next: (numFamily:number) => {       
        this.numFamily =numFamily ;        
        console.log(this.numFamily);
        this.destinationNumFamily=500;
      },
      error: (err) => {
        console.error(err);
      }
    });

    setInterval(() => {
      
      if (this.currentTotalRaised < this.destinationTotalRaised) {
        this.currentTotalRaised+=1000;// Increment the current number
      }
    },0.00001); // Adjust the interval as needed
  
   
  

    setInterval(() => {
      
      if (this.currentGoul < this.destinationGoul) {
        this.currentGoul+=1000;// Increment the current number
      }
    },0.000001); // Adjust the interval as needed

    setInterval(() => {
      
      if (this.currentNumChildren < this.destinationNumChildren) {
        this.currentNumChildren+=10;// Increment the current number
      }
    },0.01); // Adjust the interval as needed


    setInterval(() => {
      
      if (this.currentNumFamily < this.destinationNumFamily) {
        this.currentNumFamily+=1;// Increment the current number
      }
    },0.9); // Adjust the interval as needed
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
  


    // const startDate = this.StartDate.getTime();
    // const endTime = startDate + this.allowedTimeInMinutes * 60 * 1000;

    // // קביעת הזמן הנוכחי
    // const now = new Date().getTime();

    // // חישוב הזמן שנשאר לקמפיין
    // const timeLeftInMilliseconds = endTime - now;

    // // המרת הזמן לדקות ושניות
    // const minutes = Math.floor((timeLeftInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((timeLeftInMilliseconds % (1000 * 60)) / 1000);

    // // תצוגת הזמן
    // this.timeLeft = `${minutes}:${seconds}`;

    // // כל 1000 מילישניות (שניה), נעדכן את הזמן שנשאר
    // this.interval = setInterval(() => {
    //   const now = new Date().getTime();
    //   const timeLeftInMilliseconds = endTime - now;

    //   const minutes = Math.floor((timeLeftInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    //   const seconds = Math.floor((timeLeftInMilliseconds % (1000 * 60)) / 1000);

    //   this.timeLeft = `${minutes}:${seconds}`;

    //   // אם זמן הקמפיין עבר, נפסיק את הטיימר
    //   if (timeLeftInMilliseconds < 0) {
    //     clearInterval(this.interval);
    //     this.timeLeft = 'הקמפיין הסתיים';
    //     // כאן תוכל להוסיף פונקציונליות נוספת להתרעה או פעולה נוספת
    //   }
    // }, 1000);
    this.startTimer();
}
videoPlaying: boolean = false;

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
  // חישוב תאריך הסיום
  const endDate = new Date(this.startDate.getTime() + this.durationInMinutes * 60000);

  // פונקציה רקורסיבית לעדכון הזמן
  const updateTimer = () => {
    const now = new Date().getTime();
    const timeLeftInMilliseconds = endDate.getTime() - now;

    // if (timeLeftInMilliseconds <= 0) {
    //   this.timeLeft = 'הקמפיין הסתיים';
    // } else {
      const minutes = Math.floor(timeLeftInMilliseconds / 60000);
      const seconds = Math.floor((timeLeftInMilliseconds % 60000) / 1000);
      this.timeLeft = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      // שובץ את הפונקציה לקריאה חוזרת כל שנייה
      this.timer = setTimeout(updateTimer, 1000);
    // }
  };

  updateTimer(); // הפעלת הפונקציה לראשונה
}

ngOnDestroy(): void {
  clearInterval(this.timer);
}
}