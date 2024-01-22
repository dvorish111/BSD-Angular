import { Component ,AfterViewInit, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NeighborhoodService } from '../Services/neighborhood.service';
import { Neighborhood } from '../Classes/Neighborhood';
import '../../assets/check/script.js';
import { AllDonor } from '../Classes/AllClasses/AllDonor';
import { Donation } from '../Classes/Donation';
import { DonorService } from '../Services/donor.service';
import { DonationService } from '../Services/donation.service';
import { Donate } from '../Classes/Donate';
import { Donor } from '../Classes/Donor';

import { AllDonate } from '../Classes/AllClasses/AllDonate';
import { DonateService } from '../Services/donate.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  implements OnInit {
  constructor( private donateService: DonateService,private donationService: DonationService,private renderer: Renderer2,private route:Router,private activatedRoute:ActivatedRoute,private neighborhoodService:NeighborhoodService, private donorService:DonorService) { }
  selectedPaymentType:string='Ragil';
  selectedNeighborhood!:Neighborhood;
  amount!:number;
  neighborhoods!:Neighborhood[];
  donated!:Donate;
  idDonated!:number;
  sumDonationsByDonated!:number;
  donor!:Donor;
 date:Date=new Date();
 

  newDonor: AllDonor={
    FirstName:"",
    LastName:"",
    Email:"",
    Phone:0,
    City:"",
    Street:""
  }; 
  newDonation: Donation={
    isAnonymous: false,
    dedication: '',
    amount: 0,
    idDonated: 0,
    idDonor: 0,
    idNeighborhood: 0,
    idDonorNavigation: this.donor,
    date: this.date
  } ;
  okDonation: boolean =true;
  Tashlumim!: number;
  //ifAnonymous: boolean =true;
  ngOnInit() {
 
    this.activatedRoute.paramMap.subscribe(params => {

      this.idDonated =Number(params.get('donatesId'));
      this.amount= Number(params.get('amount'));
      this.sumDonationsByDonated= Number(params.get('sumDonationsByDonated'));
     this.donateService.getByIdDonate(this.idDonated ).subscribe(
        {
          next:(donated:Donate)=>{
            this.donated=donated;
            console.log( this.donated+" this.donated!!!!!")
        
          },
          error: (err) => {
            console.error(err);
          }
      });
    
    
    });

      this.getAllNeighborhoods();

    this.loadScript();
   
    window.addEventListener('message', this.receiveMessage.bind(this), false);    

    }
    getAllNeighborhoods(){
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

   

    public receiveMessage(event: MessageEvent): void {
      if (event.origin !== '../../assets/check/script.js') {
        return; // Ignore messages from other origins for security
      }
    
     // const inputData = event.data; // Access the input data sent by the iframe
      this.okDonation= event.data;
      this.keepData();
      console.log(event.data+"inputData");
    }
    
  

  loadScript() {
    const script = this.renderer.createElement('script');
    script.src = '../../assets/check/script.js';
    script.type = 'text/javascript';
    this.renderer.appendChild(document.body, script);
    
   
  }
  PaymentTypeClick(selectedPaymentType:string){
    this.selectedPaymentType=selectedPaymentType;
  }

  //To receive the message from the JS
  // handleMessage(event: MessageEvent) {
  //   const returnedData = event.data;    
  //   this.okDonation= event.data;
  //  this.keepData();
  // }

  ngOnDestroy() {
    window.removeEventListener('message', this.receiveMessage.bind(this));
  }

  keepData(){
    console.log("newDonation"+this.newDonation); 
    this.donorService.createDonor(this.newDonor).subscribe
    ({
      next: (Id) => {
        this.newDonation.idDonor=Id;
        console.log(Id);  
       this.keepDataNewDonaition();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  keepDataNewDonaition(){
    this.newDonation.amount=this.amount*this.Tashlumim;
    this.newDonation.idDonated=this.idDonated 
    console.log("newDonation"+this.newDonation);    
    this.donationService.createDonation(this.newDonation).subscribe
    ({
      next: (next) => {      
        console.log(next);        
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
